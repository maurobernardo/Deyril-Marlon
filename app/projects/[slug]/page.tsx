'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useLanguage } from '@/components/LanguageProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import PizzaChart from '@/components/PizzaChart'
import ImageLightbox from '@/components/ImageLightbox'
import { ArrowLeft, Sparkles } from 'lucide-react'

const projectData: Record<string, any> = {
  space4all: {
    en: {
      title: 'SPACE4ALL',
      subtitle: 'Mapping climate vulnerabilities of slums by combining citizen science and earth observation technology',
      period: '2024 - ongoing',
      overview: 'Overview',
      overviewText: 'SPACE4ALL is a project owned by the ITC- University of Twente (https://www.itc.nl/) and NWO (Dutch Research Council) that aims to unravel the climate vulnerability of slum communities in large and secondary cities by combining Citizen Science and Earth Observation methods. Earth Observation methods have the advantage of producing physical data for large areas and have shown their capability to map the physical aspects of slums. The project addresses the gaps by developing an innovative AI methodology by combining Citizen Science data and Earth Observation data with climate change data to locate hotspots of urban poor exposed to climate-related hazards (e.g., sea-level rise, storms, floods, extreme temperatures).',
      approach: 'This novel approach had the main purpose the development and training of deep learning models in order to map the degree of vulnerability of slum communities to climate-related risks across both large and secondary cities in Africa, to enhance the precision and the flooding early-warning capacity of the model.',
      locations: 'The project was conducted in African cities, namely Kisumu and Nairobi in Kenya, Accra and Tema in Ghana and at last Beira and Chimoio in Mozambique, in partnership with African institutions such as Data4MOZ and Sdi Kenya.',
      methodology: 'The study was conducted in a participatory format where the citizens were able to point and map the vulnerable areas of the city to climate hazards, especially flooding, including its depth level of the floods for the latest events.',
      appliedMethodology: 'The applied methodology allowed to gather local experts and stakeholders experience regarding the city\'s vulnerability to climate hazards through workshops with governmental and municipality institutions, NGO, private sector and community-based organizations that are engaged on climate action, WASH and urban planning.',
      contribution: 'Contribution',
      contributionText: 'Under the Data4MOZ umbrella, as remote sensing analyst in the institution, my role for Space4All went from the field data collect and model validation, conducting field validation sessions in Kisumo (Kenya) together with ITC-University of Twente members and leading the activities in Beira and Chimoio (Mozambique), engaging the local communities and stakeholders for model validation sessions and gather subsidies by field observations, transect walks and mapping informal settlements.',
      institutions: 'Involved institutions',
      furtherInfo: 'For further information',
      contact: 'Lorraine Trento Oliveira (ITC-UT Space4all Researcher)',
    },
    pt: {
      title: 'SPACE4ALL',
      subtitle: 'Mapeamento de vulnerabilidades climáticas de favelas combinando ciência cidadã e tecnologia de observação da terra',
      period: '2024 - em curso',
      overview: 'Visão Geral',
      overviewText: 'SPACE4ALL é um projeto da ITC- University of Twente (https://www.itc.nl/) e NWO (Conselho Holandês de Pesquisa) que visa desvendar a vulnerabilidade climática de comunidades de favelas em grandes e cidades secundárias combinando métodos de Ciência Cidadã e Observação da Terra. Os métodos de Observação da Terra têm a vantagem de produzir dados físicos para grandes áreas e mostraram sua capacidade de mapear os aspectos físicos das favelas. O projeto aborda as lacunas desenvolvendo uma metodologia inovadora de IA combinando dados de Ciência Cidadã e dados de Observação da Terra com dados de mudanças climáticas para localizar pontos críticos de pobres urbanos expostos a perigos relacionados ao clima (por exemplo, aumento do nível do mar, tempestades, inundações, temperaturas extremas).',
      approach: 'Esta abordagem inovadora teve como principal objetivo o desenvolvimento e treinamento de modelos de aprendizado profundo para mapear o grau de vulnerabilidade das comunidades de favelas a riscos relacionados ao clima em grandes e cidades secundárias na África, para melhorar a precisão e a capacidade de alerta precoce de inundações do modelo.',
      locations: 'O projeto foi realizado em cidades africanas, nomeadamente Kisumu e Nairobi no Quênia, Accra e Tema em Gana e por último Beira e Chimoio em Moçambique, em parceria com instituições africanas como Data4MOZ e Sdi Kenya.',
      methodology: 'O estudo foi realizado em formato participativo onde os cidadãos puderam apontar e mapear as áreas vulneráveis da cidade a perigos climáticos, especialmente inundações, incluindo o nível de profundidade das inundações para os eventos mais recentes.',
      appliedMethodology: 'A metodologia aplicada permitiu reunir a experiência de especialistas locais e partes interessadas sobre a vulnerabilidade da cidade a perigos climáticos através de workshops com instituições governamentais e municipais, ONG, setor privado e organizações comunitárias que estão envolvidas em ação climática, WASH e planejamento urbano.',
      contribution: 'Contribuição',
      contributionText: 'Sob o guarda-chuva da Data4MOZ, como analista de sensoriamento remoto na instituição, meu papel para o Space4All foi desde a coleta de dados de campo e validação de modelos, conduzindo sessões de validação de campo em Kisumo (Quênia) junto com membros da ITC-University of Twente e liderando as atividades em Beira e Chimoio (Moçambique), envolvendo as comunidades locais e partes interessadas para sessões de validação de modelos e reunir subsídios por observações de campo, caminhadas de transecto e mapeamento de assentamentos informais.',
      institutions: 'Instituições envolvidas',
      furtherInfo: 'Para mais informações',
      contact: 'Lorraine Trento Oliveira (Pesquisadora ITC-UT Space4all)',
    },
    coverImage: '/projects/space4all/Cover.jpg',
    images: [
      { src: '/projects/space4all/Cover.jpg', alt: 'SPACE4ALL Cover Image', label: 'SPACE4ALL Cover Image' },
      { src: '/projects/space4all/Image0.png', alt: 'Image 0: SPACE4ALL Research Approach', label: 'Image 0: SPACE4ALL Research Approach' },
      { src: '/projects/space4all/Image1.png', alt: 'Image 1 (map)', label: 'Image 1 (map)' },
      { src: '/projects/space4all/image2.jpg', alt: 'Image 2 (Participatory validation): Kisumo, January 2025', label: 'Image 2 (Participatory validation): Kisumo, January 2025' },
      { src: '/projects/space4all/Image3.jpg', alt: 'Image 3 (Participatory validation): Beira, February 2025', label: 'Image 3 (Participatory validation): Beira, February 2025' },
      { src: '/projects/space4all/image4.jpg', alt: 'Image 4: Field Observation Kisumo, January 2025', label: 'Image 4: Field Observation Kisumo, January 2025' },
    ],
    video: '/projects/space4all/Video.mp4',
  },
  bazaruto: {
    en: {
      title: 'Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area',
      subtitle: 'Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area',
      period: 'Oct. 2023 - Apr. 2024',
      overview: 'Overview',
      overviewText: 'The Greater Bazaruto KBA houses diverse marine ecosystems and because of its abundant biodiversity and diverse landscapes, this area holds significant ecological, economic, and societal importance, with tourism and fisheries serving as primary activities. This unique ecosystem sustains the livelihoods of local communities residing within the BANP and coastal communities in the mainland districts of Vilankulos, Inhassoro, and Govuro. However, the habitats and species face threats from illegal and unsustainable fishing practices, unregulated natural resource utilization.',
      objectives: 'Therefore, due to aforementioned challenges and the imperative to enhance decision making for biodiversity conservation and community engagement, this research was conducted, aiming to i) geographically map locations that are regarded as crucial for providing essential resources and services for both island and mainland communities, ii) Provide a comprehensive understanding of how these significant sites are currently being utilized and by whom within the community, iii) Identify which types of usage are deemed sustainable and harmonious, as opposed to those that may generate conflicts, iv) Investigate and document the perspectives of local communities on the anticipated changes in these areas over the next decade, including alterations in distribution and utilization patterns resulting from climate change and other environmental factors.',
      districtLevel: 'The study was conducted through a participatory spatial mapping in three different levels/categories, namely: Distrital level with the main stakeholder in natural resources management and biodiversity conservation and community level, including Communities Fishering Council (CCPs) within Vilankulo and Inhassoro districts. At district level, these workshops aimed to assess the current status of coastal planning and engage stakeholders in discussions regarding fisheries resource management across the province.',
      communityLevel: 'At community level (inland) Participatory spatial mapping was conducted separately with CCPs of Vuca, Petane, Mukokuene, Tsondzo, Mangarelane, Nhagondzo and Chivambofrom Inhassoro district and Mangalisse, Mabandene, Mondego and Chichocane from Vilankulo district, where was gathered high-value information regarding coastal zoning in fishing contest and biodiversity and ecosystems conservation efforts carried out at the community level in order to maintain the fishing activity sustainable.',
      islandLevel: 'The research covered the island\'s community within the archipelago. The communities from Magaruque, Benguera and Bazaruto islands provided extremely relevant information, given their exclusive dependence on marine resources as a means of subsistence, they revealed in-depth knowledge about coastal zoning in the region of the Greater BazarutoKBA, which enabled the creation of more precise maps with more in-depth details about fishing areas, tourism, mangroves, the occurrence of coral reefs, dugong and turtle routes, etc.',
      results: 'RESULTS (Available under request)',
      appliedSkills: 'Applied skills',
      institutions: 'Involved institutions',
      furtherInfo: 'For further information',
      skills: {
        gis: 'GIS',
        remoteSensing: 'Remote Sensing',
        communityEngagement: 'Community Engagement',
        biodiversityConservation: 'Biodiversity Conservation',
        qualitativeResearch: 'Qualitative Research',
      },
    },
    pt: {
      title: 'Mapeamento Participativo de Recursos Costeiros na Grande Área de Biodiversidade Chave de Bazaruto',
      subtitle: 'Mapeamento Participativo de Recursos Costeiros na Grande Área de Biodiversidade Chave de Bazaruto',
      period: 'Out. 2023 - Abr. 2024',
      overview: 'Visão Geral',
      overviewText: 'A Grande Área de Biodiversidade Chave (KBA) de Bazaruto abriga diversos ecossistemas marinhos e, devido à sua abundante biodiversidade e paisagens diversas, esta área possui importância ecológica, económica e social significativa, com o turismo e a pesca servindo como atividades primárias. Este ecossistema único sustenta os meios de subsistência das comunidades locais que residem dentro do BANP e das comunidades costeiras nos distritos continentais de Vilankulos, Inhassoro e Govuro. No entanto, os habitats e espécies enfrentam ameaças de práticas de pesca ilegais e insustentáveis, utilização não regulamentada de recursos naturais.',
      objectives: 'Portanto, devido aos desafios mencionados e ao imperativo de melhorar a tomada de decisões para a conservação da biodiversidade e o envolvimento comunitário, esta pesquisa foi conduzida, visando i) mapear geograficamente locais que são considerados cruciais para fornecer recursos e serviços essenciais tanto para comunidades insulares quanto continentais, ii) Fornecer uma compreensão abrangente de como estes locais significativos estão atualmente sendo utilizados e por quem dentro da comunidade, iii) Identificar quais tipos de uso são considerados sustentáveis e harmoniosos, em oposição àqueles que podem gerar conflitos, iv) Investigar e documentar as perspetivas das comunidades locais sobre as mudanças antecipadas nestas áreas na próxima década, incluindo alterações nos padrões de distribuição e utilização resultantes das mudanças climáticas e outros fatores ambientais.',
      districtLevel: 'O estudo foi conduzido através de um mapeamento espacial participativo em três níveis/categorias diferentes, nomeadamente: Nível distrital com as principais partes interessadas na gestão de recursos naturais e conservação da biodiversidade e nível comunitário, incluindo os Conselhos Comunitários de Pesca (CCPs) nos distritos de Vilankulo e Inhassoro. Ao nível distrital, estes workshops visaram avaliar o estado atual do planeamento costeiro e envolver as partes interessadas em discussões sobre a gestão dos recursos pesqueiros em toda a província.',
      communityLevel: 'Ao nível comunitário (interior) O mapeamento espacial participativo foi conduzido separadamente com os CCPs de Vuca, Petane, Mukokuene, Tsondzo, Mangarelane, Nhagondzo e Chivambofrom do distrito de Inhassoro e Mangalisse, Mabandene, Mondego e Chichocane do distrito de Vilankulo, onde foi recolhida informação de alto valor sobre o zoneamento costeiro no contexto da pesca e os esforços de conservação da biodiversidade e ecossistemas realizados ao nível comunitário para manter a atividade pesqueira sustentável.',
      islandLevel: 'A pesquisa cobriu a comunidade das ilhas dentro do arquipélago. As comunidades das ilhas de Magaruque, Benguera e Bazaruto forneceram informações extremamente relevantes, dado a sua dependência exclusiva dos recursos marinhos como meio de subsistência, revelaram conhecimento profundo sobre o zoneamento costeiro na região da Grande KBA de Bazaruto, o que permitiu a criação de mapas mais precisos com detalhes mais aprofundados sobre áreas de pesca, turismo, mangais, ocorrência de recifes de coral, rotas de dugongos e tartarugas, etc.',
      results: 'RESULTADOS (Disponível sob pedido)',
      appliedSkills: 'Habilidades aplicadas',
      institutions: 'Instituições envolvidas',
      furtherInfo: 'Para mais informações',
      skills: {
        gis: 'SIG',
        remoteSensing: 'Sensoriamento Remoto',
        communityEngagement: 'Engajamento Comunitário',
        biodiversityConservation: 'Conservação da Biodiversidade',
        qualitativeResearch: 'Investigação Qualitativa',
      },
    },
    coverImage: '/projects/Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area/Image 1_ Cover Image.jpg',
    images: [
      { src: '/projects/Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area/Image 1_ Cover Image.jpg', alt: 'Image 1: Fishing activities', label: 'Image 1: Fishing activities' },
      { src: '/projects/Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area/Image 2 Workshop at District Level.JPG', alt: 'Image 2: District Meeting photo', label: 'Image 2: District Meeting photo' },
      { src: '/projects/Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area/Image 3 _ CCP Participatory Mapping.jpg', alt: 'Image 3: CCP Participatory mapping', label: 'Image 3: CCP Participatory mapping' },
      { src: '/projects/Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area/Image 4 Island Community Participatory Mapping.JPG', alt: 'Image 4: Participatory mapping (Magarruque island-Bazaruto Archipelago, December, 2023)', label: 'Image 4: Participatory mapping (Magarruque island-Bazaruto Archipelago, December, 2023)' },
    ],
    appliedSkills: [
      { nameKey: 'gis', level: 15, color: '#3B82F6' },
      { nameKey: 'remoteSensing', level: 5, color: '#10B981' },
      { nameKey: 'communityEngagement', level: 25, color: '#F59E0B' },
      { nameKey: 'biodiversityConservation', level: 20, color: '#EF4444' },
      { nameKey: 'qualitativeResearch', level: 25, color: '#8B5CF6' },
    ],
    institutions: ['Data4MOZ', 'Afrika Parks', 'Bazaruto archipelago National Park', 'National Administration of Conservation Areas (ANAC)', 'Conservation International (C.I)', 'Syke'],
  },
  luisa: {
    en: {
      title: 'Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)',
      subtitle: 'Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)',
      period: '2024 - Oct. 2025',
      overview: 'Overview',
      overviewText: 'The long-term goal of "Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa" (LUISA) is to build the resilience of smallholder farmers and pastoralists in Africa to land use intensification resulting from rapid population growth and climate change. LUISA will achieve this goal by developing a satellite-driven decision-support platform from which policymakers can deliver more effective and reliable carbon monitoring across Africa. Human Appropriation of Net Primary Productivity (HANPP) is a key environmental indicator that helps decision-makers to understand the drivers and consequences of land use intensification on carbon dynamics on a pixel basis over large areas.',
      approach: 'The African land system is undergoing rapid changes and novel approaches are needed to understand the drivers and consequences of land use intensification, as well as the dependency, vulnerability and resilience caused by climate change. It is paramount to understand Africa\'s potential, vulnerability and resilience for a sustainable agriculture, defined as one that is low-carbon, resource-efficient, and socially inclusive. Therefore, The LUISA Project developed and is implementing new methods, effectively linking and integrating modelling, satellite EO products (Sentinels, Explorers, Meteo missions, ESA-CCI) and dataset with in-situ, stakeholder-generated, social-economic data to advance the estimation of continental Africa potential, vulnerability and resilience for a sustainable agriculture.',
      useCases: 'For in situ data collection to train the model, four use cases were developed in Senegal (Silvopastoral area), Mozambique (Beira Agriculture Growth Corridor), Ethiopia (Highland region of Lake Tana) and Uganda (Mount Elgon Agroforestry Zone).',
      mozambiqueCase: 'For Mozambique Use case, Mixed research was conducted to collect data to support the remote sensing-based platform for biomass monitoring through HANPP. The qualitative research was based on consultations with stakeholders in the Beira Agricultural Growth Corridor, through guided interviews with key informants.',
      communityConsultations: 'Additionally, Community consultations were carried out through focus group discussions separately with smallholder farmers and forestry operators.',
      quantitativeResearch: 'Quantitative research was conducted with forestry operators and timber vendors to understand the dynamics of the forestry extraction and agricultural sectors in the region and the factors that contribute to the occurrence of biomass in the region. databases from private companies and from the provincial government were also gathered.',
      results: 'This mixed approach allowed the development of a robust platform. with essential parameters to monitor the HANPP and biomass measurement at continental level.',
      furtherInfo: 'For further information, visit the Official LUISA Portal',
      portalLink: 'https://eo4africa-luisa.org/',
      appliedSkills: 'Applied skills',
      institutions: 'Involved institutions',
      skills: {
        remoteSensing: 'Remote Sensing',
        qualitativeResearch: 'Qualitative Research',
        quantitativeResearch: 'Quantitative Research',
        naturalResourcesManagement: 'Natural Resources Management',
      },
    },
    pt: {
      title: 'Potencial, Vulnerabilidade e Resiliência da Intensidade do Uso da Terra para Agricultura Sustentável em África (LUISA)',
      subtitle: 'Potencial, Vulnerabilidade e Resiliência da Intensidade do Uso da Terra para Agricultura Sustentável em África (LUISA)',
      period: '2024 - Out. 2025',
      overview: 'Visão Geral',
      overviewText: 'O objetivo de longo prazo do "Potencial, Vulnerabilidade e Resiliência da Intensidade do Uso da Terra para Agricultura Sustentável em África" (LUISA) é construir a resiliência de pequenos agricultores e pastores em África à intensificação do uso da terra resultante do rápido crescimento populacional e mudanças climáticas. O LUISA alcançará este objetivo desenvolvendo uma plataforma de apoio à decisão baseada em satélites a partir da qual os formuladores de políticas podem fornecer monitorização de carbono mais eficaz e confiável em toda a África. A Apropriação Humana da Produtividade Primária Líquida (HANPP) é um indicador ambiental chave que ajuda os decisores a compreender os impulsionadores e consequências da intensificação do uso da terra na dinâmica do carbono numa base de pixel sobre grandes áreas.',
      approach: 'O sistema de uso da terra africano está a passar por mudanças rápidas e são necessárias abordagens novas para compreender os impulsionadores e consequências da intensificação do uso da terra, bem como a dependência, vulnerabilidade e resiliência causadas pelas mudanças climáticas. É fundamental compreender o potencial, vulnerabilidade e resiliência de África para uma agricultura sustentável, definida como uma que é de baixo carbono, eficiente em recursos e socialmente inclusiva. Portanto, o Projeto LUISA desenvolveu e está a implementar novos métodos, ligando e integrando efetivamente modelação, produtos de EO por satélite (Sentinels, Explorers, missões Meteo, ESA-CCI) e conjunto de dados com dados socioeconómicos in-situ, gerados por partes interessadas, para avançar a estimativa do potencial, vulnerabilidade e resiliência da África continental para uma agricultura sustentável.',
      useCases: 'Para a recolha de dados in situ para treinar o modelo, foram desenvolvidos quatro casos de uso no Senegal (área silvopastoril), Moçambique (Corredor de Crescimento Agrícola da Beira), Etiópia (região montanhosa do Lago Tana) e Uganda (Zona Agroflorestal do Monte Elgon).',
      mozambiqueCase: 'Para o caso de uso de Moçambique, foi conduzida uma investigação mista para recolher dados para apoiar a plataforma baseada em sensoriamento remoto para monitorização de biomassa através do HANPP. A investigação qualitativa baseou-se em consultas com partes interessadas no Corredor de Crescimento Agrícola da Beira, através de entrevistas guiadas com informantes-chave.',
      communityConsultations: 'Além disso, foram realizadas consultas comunitárias através de discussões de grupos focais separadamente com pequenos agricultores e operadores florestais.',
      quantitativeResearch: 'Foi conduzida investigação quantitativa com operadores florestais e vendedores de madeira para compreender a dinâmica dos setores de extração florestal e agrícola na região e os fatores que contribuem para a ocorrência de biomassa na região. Também foram recolhidas bases de dados de empresas privadas e do governo provincial.',
      results: 'Esta abordagem mista permitiu o desenvolvimento de uma plataforma robusta. com parâmetros essenciais para monitorizar o HANPP e a medição de biomassa ao nível continental.',
      furtherInfo: 'Para mais informações, visite o Portal Oficial LUISA',
      portalLink: 'https://eo4africa-luisa.org/',
      appliedSkills: 'Habilidades aplicadas',
      institutions: 'Instituições envolvidas',
      skills: {
        remoteSensing: 'Sensoriamento Remoto',
        qualitativeResearch: 'Investigação Qualitativa',
        quantitativeResearch: 'Investigação Quantitativa',
        naturalResourcesManagement: 'Gestão de Recursos Naturais',
      },
    },
    coverImage: '/projects/Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)/IMAGE 1 Cover .jpg',
    images: [
      { src: '/projects/Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)/IMAGE 1 Cover .jpg', alt: 'Image 1: Cover Photo', label: 'Image 1: Cover Photo' },
      { src: '/projects/Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)/Image 2.jpg', alt: 'Image 2: Kick-off visit to the district economic activities service (Nhamatanda, June 2024)', label: 'Image 2: Kick-off visit to the district economic activities service (Nhamatanda, June 2024)' },
      { src: '/projects/Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)/Image 3.jpg', alt: 'Image 3: KII Section with Mozambique Sugar-cane company- Tongaat Hulett S.A (Mafambisse, July 2024)', label: 'Image 3: KII Section with Mozambique Sugar-cane company- Tongaat Hulett S.A (Mafambisse, July 2024)' },
      { src: '/projects/Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)/Image 4.jpg', alt: 'Image 4: Focus Group Discussion With Nhampoca Community (Nhamatanda, July 2024)', label: 'Image 4: Focus Group Discussion With Nhampoca Community (Nhamatanda, July 2024)' },
      { src: '/projects/Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)/Image 5.jpg', alt: 'Image 5: Data collection at EN6. with wood, charcoal and timber vendors (Tica, July 2024)', label: 'Image 5: Data collection at EN6. with wood, charcoal and timber vendors (Tica, July 2024)' },
    ],
    appliedSkills: [
      { nameKey: 'remoteSensing', level: 10, color: '#3B82F6' },
      { nameKey: 'qualitativeResearch', level: 50, color: '#10B981' },
      { nameKey: 'quantitativeResearch', level: 25, color: '#F59E0B' },
      { nameKey: 'naturalResourcesManagement', level: 15, color: '#EF4444' },
    ],
    institutions: ['Data4MOZ', 'Faculty of Geoinformation Science and Earth Observation of University of Twente', 'Boku University', 'Gi-Sat', 'Vito Remote Sensing'],
  },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const slug = params?.slug as string
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const project = projectData[slug]
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {language === 'en' ? 'Project not found' : 'Projeto não encontrado'}
          </h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105"
          >
            {language === 'en' ? 'Go back home' : 'Voltar ao início'}
          </button>
        </div>
      </div>
    )
  }

  const t = project[language] || project.en
  const images = project.images || []
  const coverImage = project.coverImage
  const appliedSkillsRaw = project.appliedSkills || []
  const institutions = project.institutions || []
  
  // Map skills with translated names
  const appliedSkills = appliedSkillsRaw.map((skill: any) => ({
    ...skill,
    name: t.skills?.[skill.nameKey as keyof typeof t.skills] || skill.nameKey || skill.name || '',
  }))

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg relative overflow-hidden">
      {/* Animated background gradients - igual à página inicial */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-dark/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <Navbar />
      <div ref={sectionRef as any} className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className={`group mb-8 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 backdrop-blur-sm border-2 border-primary/30 dark:border-primary/40 text-gray-900 dark:text-white font-semibold hover:from-primary hover:to-primary-light hover:text-white hover:border-primary/60 dark:hover:border-primary/70 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/30 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>{language === 'en' ? 'Back to projects' : 'Voltar aos projetos'}</span>
          </button>

          {/* Header */}
          <div className={`mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                {slug === 'bazaruto' || slug === 'luisa' ? t.title : `${t.title}: ${t.subtitle}`}
              </h1>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full mb-4"></div>
            <p className="text-xl text-primary dark:text-primary-light font-semibold">{t.period}</p>
          </div>

          {/* Cover Image */}
          {coverImage && (
            <div 
              className={`mb-12 relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-4 border-primary/20 dark:border-primary/30 transform transition-all duration-1000 hover:scale-[1.02] hover:shadow-primary/30 cursor-pointer group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} 
              style={{ transitionDelay: '300ms' }}
              onClick={() => {
                const coverIndex = images.findIndex(img => img.src === coverImage)
                setLightboxIndex(coverIndex >= 0 ? coverIndex : 0)
                setLightboxOpen(true)
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20 z-10 group-hover:from-primary/10 group-hover:to-primary-dark/10 transition-colors"></div>
              <Image
                src={coverImage}
                alt="Cover Image"
                fill
                className="object-cover relative z-0 group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center z-20">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-lg">
                  Click to enlarge
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="space-y-8">
            {slug === 'luisa' ? (
              /* LUISA Project Structure */
              <>
                {/* Overview */}
                <section className={`bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-1 border border-gray-200/50 dark:border-primary/20 hover:border-primary/50 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`} style={{ transitionDelay: '400ms' }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {t.overview}
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {t.overviewText}
                  </p>
                  
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {t.approach}
                  </p>

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {t.useCases}
                  </p>

                  {/* Image 2: Kick-off visit */}
                  {images[1] && (
                    <div className="mb-6 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200/50 dark:border-primary/20">
                      <Image
                        src={images[1].src}
                        alt={images[1].alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/70 dark:bg-primary/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                        {images[1].label}
                      </div>
                    </div>
                  )}

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {t.mozambiqueCase}
                  </p>

                  {/* Image 3: KII Section */}
                  {images[2] && (
                    <div className="mb-6 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200/50 dark:border-primary/20">
                      <Image
                        src={images[2].src}
                        alt={images[2].alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/70 dark:bg-primary/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                        {images[2].label}
                      </div>
                    </div>
                  )}

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {t.communityConsultations}
                  </p>

                  {/* Image 4: Focus Group Discussion */}
                  {images[3] && (
                    <div className="mb-6 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200/50 dark:border-primary/20">
                      <Image
                        src={images[3].src}
                        alt={images[3].alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/70 dark:bg-primary/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                        {images[3].label}
                      </div>
                    </div>
                  )}

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {t.quantitativeResearch}
                  </p>

                  {/* Image 5: Data collection */}
                  {images[4] && (
                    <div className="mb-6 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200/50 dark:border-primary/20">
                      <Image
                        src={images[4].src}
                        alt={images[4].alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/70 dark:bg-primary/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                        {images[4].label}
                      </div>
                    </div>
                  )}
                </section>

                {/* Results */}
                <section className={`bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-1 border border-gray-200/50 dark:border-primary/20 hover:border-primary/50 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`} style={{ transitionDelay: '600ms' }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Results
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {t.results}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.furtherInfo}{' '}
                    <a
                      href={t.portalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:text-primary-600 underline"
                    >
                      {t.portalLink}
                    </a>
                  </p>
                </section>

                {/* Applied Skills */}
                {appliedSkills.length > 0 && (
                  <section className={`bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-1 border border-gray-200/50 dark:border-primary/20 hover:border-primary/50 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`} style={{ transitionDelay: '500ms' }}>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      {t.appliedSkills}
                    </h2>
                    <PizzaChart skills={appliedSkills} />
                  </section>
                )}
              </>
            ) : slug === 'bazaruto' ? (
              /* Bazaruto Project Structure */
              <>
                {/* Overview */}
                <section className="bg-white dark:bg-dark-card rounded-lg p-6 md:p-8 shadow-md">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {t.overview}
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {t.overviewText}
                  </p>
                  
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {t.objectives}
                  </p>

                  {/* Image 1: Fishing activities */}
                  {images[0] && (
                    <div 
                      className="mb-6 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200/50 dark:border-primary/20 cursor-pointer group"
                      onClick={() => {
                        setLightboxIndex(0)
                        setLightboxOpen(true)
                      }}
                    >
                      <Image
                        src={images[0].src}
                        alt={images[0].alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-lg">
                          Click to enlarge
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/70 dark:bg-primary/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                        {images[0].label}
                      </div>
                    </div>
                  )}

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {t.districtLevel}
                  </p>

                  {/* Image 2: District Meeting photo */}
                  {images[1] && (
                    <div 
                      className="mb-6 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200/50 dark:border-primary/20 cursor-pointer group"
                      onClick={() => {
                        setLightboxIndex(1)
                        setLightboxOpen(true)
                      }}
                    >
                      <Image
                        src={images[1].src}
                        alt={images[1].alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-lg">
                          Click to enlarge
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/70 dark:bg-primary/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                        {images[1].label}
                      </div>
                    </div>
                  )}

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {t.communityLevel}
                  </p>

                  {/* Image 3: CCP Participatory mapping */}
                  {images[2] && (
                    <div 
                      className="mb-6 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200/50 dark:border-primary/20 cursor-pointer group"
                      onClick={() => {
                        setLightboxIndex(2)
                        setLightboxOpen(true)
                      }}
                    >
                      <Image
                        src={images[2].src}
                        alt={images[2].alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-lg">
                          Click to enlarge
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/70 dark:bg-primary/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                        {images[2].label}
                      </div>
                    </div>
                  )}

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {t.islandLevel}
                  </p>

                  {/* Image 4: Participatory mapping (Magarruque island) */}
                  {images[3] && (
                    <div 
                      className="mb-6 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200/50 dark:border-primary/20 cursor-pointer group"
                      onClick={() => {
                        setLightboxIndex(3)
                        setLightboxOpen(true)
                      }}
                    >
                      <Image
                        src={images[3].src}
                        alt={images[3].alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-lg">
                          Click to enlarge
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/70 dark:bg-primary/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                        {images[3].label}
                      </div>
                    </div>
                  )}
                </section>

                {/* Results */}
                <section className="bg-white dark:bg-dark-card rounded-lg p-6 md:p-8 shadow-md">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {t.results}
                  </h2>
                </section>

                {/* Applied Skills */}
                {appliedSkills.length > 0 && (
                  <section className={`bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-1 border border-gray-200/50 dark:border-primary/20 hover:border-primary/50 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`} style={{ transitionDelay: '500ms' }}>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      {t.appliedSkills}
                    </h2>
                    <PizzaChart skills={appliedSkills} />
                  </section>
                )}
              </>
            ) : (
              /* SPACE4ALL Project Structure */
              <section className="bg-white dark:bg-dark-card rounded-lg p-6 md:p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {t.overview}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {t.overviewText}
                </p>
                
                {/* Image 0: SPACE4ALL Research Approach */}
                {images[0] && (
                  <div 
                    className="mb-6 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200/50 dark:border-primary/20 cursor-pointer group"
                    onClick={() => {
                      setLightboxIndex(0)
                      setLightboxOpen(true)
                    }}
                  >
                    <Image
                      src={images[0].src}
                      alt={images[0].alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-lg">
                        Click to enlarge
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 dark:bg-primary/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                      {images[0].label}
                    </div>
                  </div>
                )}

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {t.approach}
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {t.locations}
                </p>

                {/* Image 1 (map) */}
                {images[1] && (
                  <div 
                    className="mb-6 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200/50 dark:border-primary/20 cursor-pointer group"
                    onClick={() => {
                      setLightboxIndex(1)
                      setLightboxOpen(true)
                    }}
                  >
                    <Image
                      src={images[1].src}
                      alt={images[1].alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-lg">
                        Click to enlarge
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 dark:bg-primary/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                      {images[1].label}
                    </div>
                  </div>
                )}

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {t.methodology}
                </p>

                {/* Image 2 (Participatory validation): Kisumo, January 2025 */}
                {images[2] && (
                  <div 
                    className="mb-6 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200/50 dark:border-primary/20 bg-gray-200 dark:bg-dark-surface cursor-pointer group"
                    onClick={() => {
                      setLightboxIndex(2)
                      setLightboxOpen(true)
                    }}
                  >
                    <Image
                      src={images[2].src}
                      alt={images[2].alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-lg">
                        Click to enlarge
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 dark:bg-primary/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                      {images[2].label}
                    </div>
                  </div>
                )}

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {t.appliedMethodology}
                </p>

                {/* Image 3 (Participatory validation): Beira, February 2025 */}
                {images[3] && (
                  <div 
                    className="mb-6 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200/50 dark:border-primary/20 cursor-pointer group"
                    onClick={() => {
                      setLightboxIndex(3)
                      setLightboxOpen(true)
                    }}
                  >
                    <Image
                      src={images[3].src}
                      alt={images[3].alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-lg">
                        Click to enlarge
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 dark:bg-primary/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                      {images[3].label}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Contribution - Only for SPACE4ALL */}
            {slug === 'space4all' && (
              <section className={`bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-1 border border-gray-200/50 dark:border-primary/20 hover:border-primary/50 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '500ms' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {t.contribution}
                  </h2>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {t.contributionText}
                </p>

                {/* Image 4: Field Observation Kisumo, January 2025 */}
                {images[4] && (
                  <div className="mb-6 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200/50 dark:border-primary/20 bg-gray-200 dark:bg-dark-surface">
                    <Image
                      src={images[4].src}
                      alt={images[4].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      unoptimized
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 dark:bg-primary/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                      {images[4].label}
                    </div>
                  </div>
                )}

                {/* Video */}
                {project.video && (
                  <div className="mb-6 rounded-xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-primary/20">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3 px-2">
                      {language === 'en' 
                        ? 'Video: Transect Walk in Manyata B Neighbourhood, Kisumu, Kenya, January 2025'
                        : 'Vídeo: Caminhada de Transecto no Bairro Manyata B, Kisumu, Quênia, Janeiro 2025'}
                    </p>
                    <div className="relative w-full h-64 md:h-96 bg-gray-200 dark:bg-dark-surface rounded-lg overflow-hidden">
                      <video
                        src={project.video}
                        controls
                        className="w-full h-full object-cover"
                        preload="metadata"
                      >
                        {language === 'en' 
                          ? 'Your browser does not support the video element.'
                          : 'Seu navegador não suporta o elemento de vídeo.'}
                      </video>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Involved Institutions */}
            <section className={`bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-1 border border-gray-200/50 dark:border-primary/20 hover:border-primary/50 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '800ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {t.institutions}
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {slug === 'bazaruto' || slug === 'luisa' ? (
                  institutions.map((institution: string, index: number) => (
                    <div
                      key={index}
                      className="group relative px-6 py-4 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl border-2 border-primary/20 dark:border-primary/30 flex flex-col items-center justify-center text-gray-900 dark:text-white text-xs text-center font-semibold hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary-light/10 dark:hover:from-primary/20 dark:hover:to-primary-light/20 hover:border-primary/50 dark:hover:border-primary/60 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/20 cursor-pointer overflow-hidden"
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      {/* Content */}
                      <div className="relative z-10 w-full">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary-light/20 dark:from-primary/30 dark:to-primary-light/30 flex items-center justify-center group-hover:from-primary/40 group-hover:to-primary-light/40 transition-all duration-300">
                          <Sparkles className="w-6 h-6 text-primary dark:text-primary-light" />
                        </div>
                        <p className="leading-tight">{institution}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="group relative px-6 py-4 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl border-2 border-primary/20 dark:border-primary/30 flex flex-col items-center justify-center text-gray-900 dark:text-white text-sm font-semibold hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary-light/10 dark:hover:from-primary/20 dark:hover:to-primary-light/20 hover:border-primary/50 dark:hover:border-primary/60 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/20 cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <div className="relative z-10 w-full">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary-light/20 dark:from-primary/30 dark:to-primary-light/30 flex items-center justify-center group-hover:from-primary/40 group-hover:to-primary-light/40 transition-all duration-300">
                          <Sparkles className="w-6 h-6 text-primary dark:text-primary-light" />
                        </div>
                        <p>ITC-UT</p>
                      </div>
                    </div>
                    <div className="group relative px-6 py-4 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl border-2 border-primary/20 dark:border-primary/30 flex flex-col items-center justify-center text-gray-900 dark:text-white text-sm font-semibold hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary-light/10 dark:hover:from-primary/20 dark:hover:to-primary-light/20 hover:border-primary/50 dark:hover:border-primary/60 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/20 cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <div className="relative z-10 w-full">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary-light/20 dark:from-primary/30 dark:to-primary-light/30 flex items-center justify-center group-hover:from-primary/40 group-hover:to-primary-light/40 transition-all duration-300">
                          <Sparkles className="w-6 h-6 text-primary dark:text-primary-light" />
                        </div>
                        <p>NWO</p>
                      </div>
                    </div>
                    <div className="group relative px-6 py-4 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl border-2 border-primary/20 dark:border-primary/30 flex flex-col items-center justify-center text-gray-900 dark:text-white text-sm font-semibold hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary-light/10 dark:hover:from-primary/20 dark:hover:to-primary-light/20 hover:border-primary/50 dark:hover:border-primary/60 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/20 cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <div className="relative z-10 w-full">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary-light/20 dark:from-primary/30 dark:to-primary-light/30 flex items-center justify-center group-hover:from-primary/40 group-hover:to-primary-light/40 transition-all duration-300">
                          <Sparkles className="w-6 h-6 text-primary dark:text-primary-light" />
                        </div>
                        <p>Data4MOZ</p>
                      </div>
                    </div>
                    <div className="group relative px-6 py-4 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl border-2 border-primary/20 dark:border-primary/30 flex flex-col items-center justify-center text-gray-900 dark:text-white text-sm font-semibold hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary-light/10 dark:hover:from-primary/20 dark:hover:to-primary-light/20 hover:border-primary/50 dark:hover:border-primary/60 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/20 cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <div className="relative z-10 w-full">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary-light/20 dark:from-primary/30 dark:to-primary-light/30 flex items-center justify-center group-hover:from-primary/40 group-hover:to-primary-light/40 transition-all duration-300">
                          <Sparkles className="w-6 h-6 text-primary dark:text-primary-light" />
                        </div>
                        <p>SDI Kenya</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* For further information */}
            <section className={`bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-1 border border-gray-200/50 dark:border-primary/20 hover:border-primary/50 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '900ms' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {t.furtherInfo}
                </h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t.contact}
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
      
      {/* Image Lightbox */}
      <ImageLightbox
        images={images}
        isOpen={lightboxOpen}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        projectTitle={t.title}
      />
    </main>
  )
}

