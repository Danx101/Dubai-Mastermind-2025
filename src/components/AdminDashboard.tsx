import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import {
  Users,
  Package,
  CheckCircle,
  Download,
  Search,
  Filter,
  Eye,
  Euro,
} from 'lucide-react';

// Initialize Supabase client (using anon key for read-only access)
const supabase = createClient(
  'https://jysuiirrqxplhryyoyeg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5c3VpaXJycXhwbGhyeXlveWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MzAzNjMsImV4cCI6MjA3OTEwNjM2M30.PBeEqkFxWwjn7sFrXN_fpOdoe2onUP1itac5Nj5ukL4'
);

interface Application {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  package_type: 'A' | 'B';
  quantity: number;
  message: string;
  payment_status: 'pending' | 'completed' | 'failed';
  total_amount: number | null;
  stripe_payment_intent_id: string | null;
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPackage, setFilterPackage] = useState<'all' | 'A' | 'B'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'failed'>('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Fetch applications from Supabase
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
      setFilteredApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...applications];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.phone.includes(searchTerm)
      );
    }

    // Package filter
    if (filterPackage !== 'all') {
      filtered = filtered.filter((app) => app.package_type === filterPackage);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter((app) => app.payment_status === filterStatus);
    }

    setFilteredApplications(filtered);
  }, [searchTerm, filterPackage, filterStatus, applications]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'ID',
      'Datum',
      'Vorname',
      'Nachname',
      'E-Mail',
      'Telefon',
      'Paket',
      'Anzahl',
      'Status',
      'Nachricht',
    ];

    const rows = filteredApplications.map((app) => [
      app.id,
      new Date(app.created_at).toLocaleString('de-DE'),
      app.first_name,
      app.last_name,
      app.email,
      app.phone,
      app.package_type,
      app.quantity,
      app.payment_status,
      `"${app.message.replace(/"/g, '""')}"`, // Escape quotes in message
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `applications_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  // Calculate statistics
  const stats = {
    total: applications.length,
    packageA: applications.filter((app) => app.package_type === 'A').length,
    packageB: applications.filter((app) => app.package_type === 'B').length,
    pending: applications.filter((app) => app.payment_status === 'pending').length,
    completed: applications.filter((app) => app.payment_status === 'completed').length,
    totalTickets: applications.reduce((sum, app) => sum + app.quantity, 0),
    totalRevenue: applications
      .filter((app) => app.payment_status === 'completed')
      .reduce((sum, app) => {
        const price = app.package_type === 'A' ? 100 : 200;
        return sum + price * app.quantity;
      }, 0),
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          icon={<Users className="h-6 w-6" />}
          label="Gesamt Bewerbungen"
          value={stats.total}
          color="purple"
        />
        <StatCard
          icon={<Package className="h-6 w-6" />}
          label="Paket A"
          value={stats.packageA}
          color="blue"
        />
        <StatCard
          icon={<Package className="h-6 w-6" />}
          label="Paket B"
          value={stats.packageB}
          color="indigo"
        />
        <StatCard
          icon={<CheckCircle className="h-6 w-6" />}
          label="Bezahlt"
          value={stats.completed}
          color="green"
        />
        <StatCard
          icon={<Euro className="h-6 w-6" />}
          label="Gesamtumsatz"
          value={`€${stats.totalRevenue.toLocaleString('de-DE')}`}
          color="emerald"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Search className="inline h-4 w-4 mr-1" />
              Suche
            </label>
            <input
              type="text"
              placeholder="Name, E-Mail oder Telefon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Package Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Filter className="inline h-4 w-4 mr-1" />
              Paket
            </label>
            <select
              value={filterPackage}
              onChange={(e) => setFilterPackage(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Alle</option>
              <option value="A">Paket A</option>
              <option value="B">Paket B</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Filter className="inline h-4 w-4 mr-1" />
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Alle</option>
              <option value="pending">Ausstehend</option>
              <option value="completed">Bezahlt</option>
              <option value="failed">Fehlgeschlagen</option>
            </select>
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export CSV ({filteredApplications.length})
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Datum
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  E-Mail
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Paket
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Anzahl
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Keine Bewerbungen gefunden
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(app.created_at).toLocaleDateString('de-DE')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {app.first_name} {app.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {app.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          app.package_type === 'B'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        Paket {app.package_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={app.payment_status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedApplication(app)}
                        className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
}) {
  const colorClasses = {
    purple: 'bg-purple-100 text-purple-600',
    blue: 'bg-blue-100 text-blue-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    green: 'bg-green-100 text-green-600',
    emerald: 'bg-emerald-100 text-emerald-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };

  const labels = {
    pending: 'Ausstehend',
    completed: 'Bezahlt',
    failed: 'Fehlgeschlagen',
  };

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styles[status as keyof typeof styles]}`}>
      {labels[status as keyof typeof labels]}
    </span>
  );
}

// Application Detail Modal Component
function ApplicationDetailModal({
  application,
  onClose,
}: {
  application: Application;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Bewerbungsdetails</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Personal Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Persönliche Informationen</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Vorname</p>
                <p className="font-medium text-gray-900">{application.first_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nachname</p>
                <p className="font-medium text-gray-900">{application.last_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">E-Mail</p>
                <p className="font-medium text-gray-900">{application.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Telefon</p>
                <p className="font-medium text-gray-900">{application.phone}</p>
              </div>
            </div>
          </div>

          {/* Package Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Paket-Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Paket</p>
                <p className="font-medium text-gray-900">Paket {application.package_type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Anzahl Tickets</p>
                <p className="font-medium text-gray-900">{application.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <StatusBadge status={application.payment_status} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Eingereicht am</p>
                <p className="font-medium text-gray-900">
                  {new Date(application.created_at).toLocaleString('de-DE')}
                </p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Nachricht</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{application.message}</p>
            </div>
          </div>

          {/* ID */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">Application ID: {application.id}</p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Schließen
          </button>
        </div>
      </motion.div>
    </div>
  );
}
