import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DashboardClient } from '@/features/admin/components/DashboardClient';
import StoreSummaryCards from '@/features/admin/components/StoreSummaryCards';
import RecentOrdersTable from '@/features/admin/components/RecentOrdersTable';
import { createClient } from '@/lib/supabase/server';
import { hasEnvVars } from '@/lib/utils';

export default async function AdminDashboard() {
  if (!hasEnvVars) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground mb-8">Resumen de Tienda</h1>

        <Alert variant="warning">
          <AlertTitle>Configuración de Supabase pendiente</AlertTitle>
          <AlertDescription>
            Define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY para cargar los datos del panel.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const supabase = await createClient();

  const { count: currentProducts } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: currentCategories } = await supabase.from('categories').select('*', { count: 'exact', head: true });
  const { count: currentOrders } = await supabase.from('orders').select('*', { count: 'exact', head: true });

  const { data: recentOrders } = await supabase
    .from('orders')
    .select('id, status, total_amount, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Resumen de Tienda</h1>

      <StoreSummaryCards
        categoriesCount={currentCategories}
        productsCount={currentProducts}
        ordersCount={currentOrders}
      />

      <div className="mt-8">
        <DashboardClient />
      </div>

      <RecentOrdersTable orders={recentOrders || []} />
    </div>
  );
}
