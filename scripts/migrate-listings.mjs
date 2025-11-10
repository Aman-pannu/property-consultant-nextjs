#!/usr/bin/env node
import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getSupabaseClient } from '../lib/supabase.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const JSON_PATH = path.join(ROOT, 'content', 'listings.json')

async function loadListings(){
  const raw = await readFile(JSON_PATH, 'utf-8')
  return JSON.parse(raw)
}

function toSupabasePayload(item){
  return {
    source_id: item.id?.toString() || null,
    title: item.title,
    meta: item.meta,
    image: item.image,
    suburb: item.suburb,
    badges: item.badges || [],
    slug: item.slug || item.id?.toString(),
    virtual_tour: item.virtualTour || item.virtual_tour || null
  }
}

async function main(){
  const supabase = getSupabaseClient()
  const listings = await loadListings()
  if(!Array.isArray(listings) || !listings.length){
    console.log('No listings found in content/listings.json')
    return
  }

  const payloads = listings.map(toSupabasePayload)
  const { data, error } = await supabase.from('listings').upsert(payloads, { onConflict: 'slug' })
  if(error){
    console.error('Failed to migrate listings:', error)
    process.exit(1)
  }
  console.log(`Synced ${data?.length ?? payloads.length} listings to Supabase.`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
