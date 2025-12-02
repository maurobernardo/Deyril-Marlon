export interface Translations {
  nav: {
    home: string
    about: string
    projects: string
    skills: string
    courses: string
    publications: string
    training: string
  }
  home: {
    name: string
    title: string
    welcomeMessage: string
    rotatingTexts: string[]
    seeCV: string
    iAm: string
    downloadCV: string
    contact: string
  }
  about: {
    title: string
    bio: string
    professionalOverview: string
    keyHighlights: string
    highlights: {
      specialized: string
      passionate: string
      community: string
    }
    quote: string
    expertiseAreas: {
      remoteSensing: {
        title: string
        description: string
      }
      agricultureForest: {
        title: string
        description: string
      }
      spatialData: {
        title: string
        description: string
      }
      communityEngagement: {
        title: string
        description: string
      }
      mel: {
        title: string
        description: string
      }
      researchDesign: {
        title: string
        description: string
      }
    }
  }
  projects: {
    title: string
    viewDetails: string
    date: string
    description: string
    space4all: {
      title: string
      subtitle: string
      date: string
      overview: string
    }
    bazaruto: {
      title: string
      subtitle: string
      date: string
      overviewText: string
    }
    luisa: {
      title: string
      subtitle: string
      date: string
      overviewText: string
    }
    fisheriesBazaruto: {
      title: string
      subtitle: string
      date: string
      overview: string
      overviewText: string
      objective: string
      methodology: string
      results: string
      appliedSkills: string
      institutions: string
      skills: {
        biodiversityConservation: string
        dataAnalysis: string
        quantitativeResearch: string
        qualitativeResearch: string
        communityEngagement: string
        naturalResourcesManagement: string
      }
    }
    communityLedNRM: {
      title: string
      subtitle: string
      date: string
      overview: string
      overviewText: string
      objective: string
      methodology: string
      results: string
      appliedSkills: string
      institutions: string
      skills: {
        mel: string
        sustainableLivelihood: string
        gis: string
        naturalResourcesManagement: string
      }
    }
  }
  skills: {
    title: string
    tools: string
    remoteSensing: string
    remoteSensingDescription: string
    gis: string
    gisDescription: string
    dataAnalysis: string
    dataAnalysisDescription: string
    precisionAgriculture: string
    precisionAgricultureDescription: string
    dataManagement: string
    dataManagementDescription: string
    mel: string
    melDescription: string
    quantitativeQualitative: string
    quantitativeQualitativeDescription: string
    naturalResourcesManagement: string
    naturalResourcesManagementDescription: string
    sustainableLivelihood: string
    sustainableLivelihoodDescription: string
    communityEngagement: string
    communityEngagementDescription: string
  }
  courses: {
    title: string
    coursesList: {
      bscAgriculturalEngineering: string
      uavPrecisionAgriculture: string
      advancedStatistics: string
      qualiQuantitativeResearch: string
    }
    institutions: {
      eduardoMondlaneUniversity: string
      universityOfTwente: string
      centreOfExcellenceUEM: string
      amazonasUniversity: string
    }
    locations: {
      mozambique: string
      netherlands: string
      brazil: string
    }
  }
  publications: {
    title: string
    readMore: string
    publicationsList: {
      exposedUnmapped: string
      validationLeafArea: string
    }
    authors: {
      oliveiraEtAl: string
      ibraimoMananze: string
    }
    journals: {
      researchSquare: string
      scienceCribe: string
    }
  }
  training: {
    title: string
    koboToolbox: {
      title: string
      date: string
      description: string
      students: string
      providedBy: string
      programs: string
      programsList: string
      outcome: string
    }
    googleEarthEngine: {
      title: string
      date: string
      description: string
      attendees: string
      providedBy: string
      examples: string
      examplesList: string
      participants: string
    }
    googleMyMaps: {
      title: string
      date: string
      description: string
      providedBy: string
      locations: string
      locationsList: string
    }
    sustainableNRM: {
      title: string
      date: string
      description: string
      communities: string
      providedBy: string
      communitiesList: string
      outcomes: string
    }
    communityGovernance: {
      title: string
      date: string
      description: string
      committees: string
      providedBy: string
      contentTitle: string
      content: string
    }
  }
  contact: {
    title: string
    sendMessage: string
    nome: string
    nomePlaceholder: string
    apelido: string
    apelidoPlaceholder: string
    email: string
    emailPlaceholder: string
    assunto: string
    assuntoPlaceholder: string
    contacto: string
    contactoPlaceholder: string
    mensagem: string
    mensagemPlaceholder: string
    send: string
    sending: string
    success: string
    successMessage: string
    errorMessage: string
    connectWithUs: string
    scheduleConsultation: string
    whatsappMessage: string
    followUs: string
    location: string
    country: string
    province: string
    city: string
  }
  footer: {
    allRightsReserved: string
  }
  chatbot: {
    openChatbot: string
    closeChatbot: string
    title: string
    online: string
    placeholder: string
    hint: string
    greeting: string
    defaultResponse: string
    typing: string
  }
  stats: {
    title: string
    yearsExperience: string
    projectsCompleted: string
    publications: string
    communitiesTrained: string
    countriesWorked: string
  }
  timeline: {
    title: string
    subtitle: string
    items: Array<{
      type: 'work' | 'education' | 'achievement'
      typeLabel: string
      title: string
      period: string
      organization?: string
      location?: string
      description?: string
      highlights?: string[]
    }>
  }
  space4all: {
    title: string
    subtitle: string
    period: string
    overview: string
    overviewText: string
    approach: string
    locations: string
    methodology: string
    contribution: string
    contributionText: string
    institutions: string
    furtherInfo: string
    contact: string
  }
}

