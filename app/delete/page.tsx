import HealthForm from './action'
import { createClient } from '@/utils/supabase/server'
export default async function Account() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <HealthForm user={user} />
}