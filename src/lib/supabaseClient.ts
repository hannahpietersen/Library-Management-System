// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://woqcuequandxfzpfozgv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvcWN1ZXF1YW5keGZ6cGZvemd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NjIyMTAsImV4cCI6MjA2NTAzODIxMH0.MyX96kayMiCUPAj5zHXyZ-OGjIEN1CAeL3Ad7FSBhxk' // from Supabase API settings

export const supabase = createClient(supabaseUrl, supabaseKey)