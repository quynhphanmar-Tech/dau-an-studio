import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper to sync Brand Profile to Supabase database
 */
export async function syncBrandProfileToSupabase(profile) {
  try {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      console.warn('Supabase URL not configured. Profile stored locally.');
      return { success: false, error: 'Missing VITE_SUPABASE_URL' };
    }

    const { data, error } = await supabase
      .from('brand_profiles')
      .upsert([
        {
          name: profile.name,
          years_experience: profile.yearsExperience,
          biggest_win: profile.biggestWin,
          strength_summary: profile.strengthSummary,
          who_help: profile.whoHelp,
          what_change: profile.whatChange,
          why_trust: profile.whyTrust,
          positioning_statement: profile.positioningStatement,
          offer_type: profile.offerType,
          offer_description: profile.offerDescription,
          archetype_id: profile.archetypeId,
          archetype_name: profile.archetypeName,
          brand_vibe: profile.brandVibe,
          updated_at: new Date().toISOString(),
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Supabase Profile Sync Error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Helper to sync Opportunities to Supabase database
 */
export async function syncOpportunityToSupabase(opportunity) {
  try {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      return { success: false, error: 'Missing VITE_SUPABASE_URL' };
    }

    const { data, error } = await supabase
      .from('opportunities')
      .insert([
        {
          person: opportunity.person,
          role: opportunity.role,
          message: opportunity.message,
          source: opportunity.source,
          status: opportunity.status || 'new',
          value: opportunity.value,
          created_at: new Date().toISOString(),
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Supabase Opportunity Sync Error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Helper to sync ICF Reflections & Commitments to Supabase database
 */
export async function syncReflectionToSupabase(reflection) {
  try {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      return { success: false, error: 'Missing VITE_SUPABASE_URL' };
    }

    const { data, error } = await supabase
      .from('reflections')
      .insert([
        {
          category: reflection.category,
          question: reflection.question,
          reflection_text: reflection.reflection,
          action_commitment: reflection.commitment,
          created_at: new Date().toISOString(),
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Supabase Reflection Sync Error:', err);
    return { success: false, error: err.message };
  }
}
