/**
 * Sample Memoirs Records for Aldr Memoirs Demo
 * Demonstrates family memories and cross-vault legal planning linking
 */

const sampleMemoirsRecords = [
  {
    id: 'memoir-1',
    title: 'Family Photos - Christmas 2024',
    category: 'family_photos',
    type: 'photo_collection',
    status: 'archived',
    date: '2024-12-25',
    location: 'Dublin, Ireland',
    description: 'Christmas celebration with the extended family in Dublin. Three generations gathered for traditional Irish Christmas dinner.',
    details: {
      photoCount: 47,
      videoCount: 3,
      participants: ['James Stafford', 'Catherine Conaghan', 'Patrick Murphy', 'Sarah Murphy', 'Kids: Emma, Liam, Aoife'],
      highlights: ['Christmas dinner', 'Gift exchange', 'Traditional Irish music session']
    },
    tags: ['christmas', 'dublin', 'family', 'tradition']
  },
  {
    id: 'memoir-2',
    title: 'Grandfather\'s War Letters (1940-1945)',
    category: 'historical_documents',
    type: 'correspondence',
    status: 'preserved',
    date: '1940-09-15',
    description: 'Collection of letters from grandfather Patrick Stafford during WWII service. Digitized and preserved for family history.',
    details: {
      letterCount: 23,
      period: '1940-1945',
      correspondent: 'Patrick Stafford to Mary Stafford',
      significance: 'Family history documentation of WWII experience',
      digitizationDate: '2025-03-15'
    },
    tags: ['wwii', 'family_history', 'letters', 'patrick_stafford'],
    preservation: {
      originalCondition: 'Good - stored in acid-free boxes',
      digitalFormat: 'High-resolution PDF scans',
      backupLocations: ['Aldr Vault', 'Family Archive']
    }
  },
  {
    id: 'memoir-3',
    title: 'Wedding Video - James & Sarah 2015',
    category: 'life_events',
    type: 'video_recording',
    status: 'archived',
    date: '2015-08-15',
    location: 'Killarney, County Kerry, Ireland',
    description: 'Wedding ceremony and reception video, professionally filmed. Includes speeches, ceremony, and celebration.',
    details: {
      duration: '3 hours 45 minutes',
      format: 'HD Video',
      videographer: 'Celtic Memories Productions',
      participants: ['James Stafford', 'Sarah Murphy', '120 wedding guests']
    },
    tags: ['wedding', 'killarney', 'celebration', '2015'],
    sharing: {
      familyAccess: true,
      restrictedAccess: false,
      sharedWith: ['Catherine Conaghan', 'Murphy Family', 'Wedding Party']
    }
  },
  {
    id: 'memoir-4',
    title: 'Family Recipe Collection',
    category: 'family_traditions',
    type: 'recipe_collection',
    status: 'active',
    date: '2025-01-10',
    description: 'Traditional Irish family recipes passed down through generations. Includes grandmother\'s brown bread recipe and Christmas pudding.',
    details: {
      recipeCount: 15,
      contributors: ['Grandmother Mary', 'Mother Catherine', 'Aunt Brigid'],
      categories: ['Breads', 'Desserts', 'Main Courses', 'Holiday Specials'],
      featured: 'Grandmother Mary\'s Famous Brown Bread'
    },
    tags: ['recipes', 'irish_tradition', 'family_cooking', 'heritage'],
    legacy: {
      significance: 'Cultural heritage preservation',
      nextGeneration: 'Shared with nieces and nephews',
      modifications: 'Updated with modern measurements'
    }
  },
  {
    id: 'memoir-5',
    title: 'Audio Recordings - Grandfather\'s Stories',
    category: 'oral_history',
    type: 'audio_recording',
    status: 'preserved',
    date: '2010-06-20',
    description: 'Audio recordings of grandfather sharing stories about growing up in rural Ireland in the 1930s.',
    details: {
      recordingCount: 8,
      totalDuration: '4 hours 15 minutes',
      topics: ['Childhood memories', 'Farm life', 'Local history', 'Family stories'],
      recordedBy: 'James Stafford',
      equipment: 'Digital voice recorder'
    },
    tags: ['oral_history', 'grandfather', 'ireland_1930s', 'family_stories'],
    transcription: {
      status: 'Partially complete',
      completedSessions: 3,
      remainingSessions: 5,
      notes: 'Strong Irish accent requires careful transcription'
    }
  },
  {
    id: 'memoir-6',
    title: 'Family Tree Research Project',
    category: 'genealogy',
    type: 'research_documentation',
    status: 'ongoing',
    date: '2024-11-01',
    description: 'Comprehensive family tree research tracing Stafford and Conaghan family lines back to 1800s Ireland.',
    details: {
      generationsTraced: 6,
      individualsDocumented: 127,
      earliestRecord: '1823 - Patrick Stafford birth record',
      primarySources: ['Church records', 'Census data', 'Land records'],
      researchPlatforms: ['Ancestry.com', 'FamilySearch', 'National Archives Ireland']
    },
    tags: ['genealogy', 'family_tree', 'irish_ancestry', 'research'],
    discoveries: [
      'Stafford family originated in County Cork',
      'Conaghan family were farmers in Donegal',
      'Connection to 1916 Easter Rising participant',
      'Emigration to America in 1890s branch'
    ]
  },
  {
    id: 'memoir-7',
    title: 'Digital Legacy Planning',
    category: 'legacy_planning',
    type: 'digital_inheritance',
    status: 'planned',
    date: '2025-02-15',
    description: 'Comprehensive digital legacy plan for family photos, videos, and documents. Links to estate planning in Aldr Legal.',
    details: {
      digitalAssets: ['Photo collections', 'Video archives', 'Audio recordings', 'Document scans'],
      beneficiaries: ['Sarah Stafford (spouse)', 'Catherine Conaghan (mother)', 'Murphy family'],
      accessProtocols: ['Immediate family access', 'Extended family viewing rights', 'Archive preservation'],
      legalDocuments: 'Links to will and estate planning in Aldr Legal'
    },
    tags: ['digital_legacy', 'inheritance', 'estate_planning', 'family_access'],
    legalConnection: {
      linkedVault: 'Aldr Legal',
      relatedDocuments: ['Last Will and Testament', 'Digital Asset Inventory'],
      instructions: 'Detailed in estate planning documents'
    }
  },
  {
    id: 'memoir-8',
    title: 'Family Home - Historical Documentation',
    category: 'property_history',
    type: 'historical_record',
    status: 'documented',
    date: '2024-09-10',
    location: 'Blackrock, Dublin',
    description: 'Historical documentation of the family home in Blackrock, including photos, renovations, and family memories.',
    details: {
      propertyAge: 'Built in 1925',
      familyOwnership: '1963 - Present',
      renovations: ['Kitchen modernization 1995', 'Bathroom updates 2010', 'Garden redesign 2018'],
      memorableEvents: ['Christmas gatherings', 'Birthday celebrations', 'Family meetings']
    },
    tags: ['family_home', 'blackrock', 'property_history', 'dublin'],
    documentation: {
      photos: 'Historical and current photos',
      floorPlans: 'Original and modified layouts',
      familyStories: 'Memories and events in each room'
    }
  }
];

export default sampleMemoirsRecords;