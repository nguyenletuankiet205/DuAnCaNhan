update public.services
set is_active = false,
    updated_at = now()
where service_type = 'marketing_audit';
