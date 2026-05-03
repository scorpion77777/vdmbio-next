import { Product, Category } from '@/types'

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Antivirals', slug: 'antivirals', description: 'Antiviral compounds for HIV, Influenza, Herpes research', image_url: null, parent_id: null },
  { id: '2', name: 'Apoptosis', slug: 'apoptosis', description: 'Apoptosis inducers, inhibitors and caspase products', image_url: null, parent_id: null },
  { id: '3', name: 'Cancer', slug: 'cancer', description: 'Anticancer reagents, cell cycle, signaling compounds', image_url: null, parent_id: null },
  { id: '4', name: 'Enzyme Inhibitors', slug: 'enzyme-inhibitors', description: 'Protease inhibitors and enzyme activators', image_url: null, parent_id: null },
  { id: '5', name: 'Antibiotics', slug: 'antibiotics', description: 'Antibiotic research compounds', image_url: null, parent_id: null },
  { id: '6', name: 'DNA Damage/Repair', slug: 'dna-damage-repair', description: 'DNA damage and repair pathway modulators', image_url: null, parent_id: null },
  { id: '7', name: 'Cholinergics', slug: 'cholinergics', description: 'Cholinergic compounds for neuroscience', image_url: null, parent_id: null },
  { id: '8', name: 'Anticoagulants', slug: 'anticoagulants', description: 'Anticoagulant research chemicals', image_url: null, parent_id: null },
  { id: '9', name: 'Intermediates & Fine Chemicals', slug: 'intermediates-fine-chemicals', description: 'Unusual amino acids and synthetic intermediates', image_url: null, parent_id: null },
  { id: '10', name: 'Histaminergics', slug: 'histaminergics', description: 'Histamine receptor modulators', image_url: null, parent_id: null },
  { id: '11', name: 'Inorganics', slug: 'inorganics', description: 'Inorganic research compounds', image_url: null, parent_id: null },
  { id: '12', name: 'Enzyme Substrates', slug: 'enzyme-substrates-and-activators', description: 'Enzyme substrates and activators', image_url: null, parent_id: null },
]

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1', name: 'H-Hyp-OH', slug: 'h-hyp-oh',
    catalog_number: 'VD-UAA-0238', cas_number: '51-35-4',
    formula: 'C5H9NO3', molecular_weight: '131.1', purity: 'HPLC-98%min.',
    appearance: 'White crystalline powder', solubility: 'Water', storage: '-20°C',
    synonyms: '(2S,4R)-4-hydroxypyrrolidine-2-carboxylic acid',
    description: 'H-Hyp-OH is a hydroxyproline amino acid derivative used in peptide synthesis and collagen research.',
    category_id: '9', image_url: null, price_min: 180, price_max: 800, created_at: '2021-09-01'
  },
  {
    id: '2', name: 'Salubrinal', slug: 'salubrinal',
    catalog_number: 'VD-OEIA-0277', cas_number: '1203494-61-4',
    formula: 'C21H17Cl3N4OS', molecular_weight: '480.8', purity: '>98%',
    appearance: 'White solid', solubility: 'DMSO', storage: '-20°C',
    synonyms: null,
    description: 'Salubrinal is a selective inhibitor of eIF2α dephosphorylation, protecting cells from ER stress.',
    category_id: '4', image_url: null, price_min: 60, price_max: 240, created_at: '2021-09-01'
  },
  {
    id: '3', name: 'Z-VAD(OMe)-FMK', slug: 'z-vadome-fmk',
    catalog_number: 'VD-NP-0073', cas_number: '187389-52-2',
    formula: 'C26H34FN3O9', molecular_weight: '555.6', purity: '>97%',
    appearance: 'White to off-white solid', solubility: 'DMSO', storage: '-20°C',
    synonyms: 'Pan-caspase inhibitor',
    description: 'A cell-permeable, irreversible pan-caspase inhibitor widely used in apoptosis research.',
    category_id: '2', image_url: null, price_min: 85, price_max: 320, created_at: '2021-09-01'
  },
  {
    id: '4', name: 'Q-VD-OPH', slug: 'q-vd-oph',
    catalog_number: 'VD-NP-0067', cas_number: '1135695-98-5',
    formula: 'C23H25FN4O5', molecular_weight: '476.5', purity: '>97%',
    appearance: 'White solid', solubility: 'DMSO', storage: '-20°C',
    synonyms: 'Quinoline-Val-Asp(OMe)-CH2-OPh',
    description: 'Q-VD-OPh is a broad-spectrum, cell-permeable caspase inhibitor with low toxicity.',
    category_id: '2', image_url: null, price_min: 95, price_max: 380, created_at: '2021-09-01'
  },
  {
    id: '5', name: 'SANT-1', slug: 'sant-1',
    catalog_number: 'VD-OEIA-0059', cas_number: '304909-07-7',
    formula: 'C26H21N3O', molecular_weight: '407.5', purity: '>98%',
    appearance: 'Yellow solid', solubility: 'DMSO', storage: '-20°C',
    synonyms: 'Hedgehog pathway antagonist 1',
    description: 'SANT-1 is a potent Hedgehog (Hh) pathway antagonist that targets the Smoothened receptor.',
    category_id: '3', image_url: null, price_min: 75, price_max: 300, created_at: '2021-09-01'
  },
  {
    id: '6', name: '(-)-Actinonin', slug: 'actinonin',
    catalog_number: 'VD-OEIA-0021', cas_number: '13434-13-4',
    formula: 'C19H35N3O5', molecular_weight: '385.5', purity: '>98%',
    appearance: 'Off-white solid', solubility: 'DMSO', storage: '+4°C',
    synonyms: null,
    description: 'Actinonin is a naturally occurring antibiotic and metalloprotease inhibitor.',
    category_id: '5', image_url: null, price_min: 55, price_max: 220, created_at: '2021-09-01'
  },
]
