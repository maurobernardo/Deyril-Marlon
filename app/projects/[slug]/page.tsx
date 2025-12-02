'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useLanguage } from '@/components/LanguageProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import PizzaChart from '@/components/PizzaChart'
import { motion } from 'framer-motion'

// Mapeamento de instituições para logotipos
const institutionLogos: Record<string, string> = {
  'ITC-UT': '/Logos/ITC_University of Twente.png',
  'ITC-University of Twente': '/Logos/ITC_University of Twente.png',
  'University of Twente': '/Logos/ITC_University of Twente.png',
  'NWO': '/Logos/Gi-Sat.png',
  'Data4MOZ': '/Logos/d4m.jpg',
  'SDI Kenya': '/Logos/SDI_Kenya_logo_colour.jpg',
  'Sdi Kenya': '/Logos/SDI_Kenya_logo_colour.jpg',
  'Bazaruto Archipelago National Park': '/Logos/Bazaruto-Logo_Original.jpg',
  'African Parks': '/Logos/African_Parks_logo.png',
  'ANAC': '/Logos/ANAC.jpg',
  'National Administration of Conservations Area (ANAC)': '/Logos/ANAC.jpg',
  'USAID': '/Logos/USAID.png',
  'Gorongosa National Park': '/Logos/Gorongosa National Park.png',
  'ESA': '/Logos/ESA_logo.png',
  'European Space Agency (ESA)': '/Logos/ESA_logo.png',
  'European Space Agency': '/Logos/ESA_logo.png',
  'Faculty of Geoinformation Science and Earth Observation of University of Twente': '/Logos/ITC_University of Twente.png',
  'Boku University': '/Logos/Boku University.png',
  'Gi-Sat': '/Logos/Gi-Sat.png',
  'Vito Remote Sensing': '/Logos/Vito Remote Sensing.png',
  'Makerere University': '/Logos/Makerere_University.jpg',
  'Afrika Parks': '/Logos/African_Parks_logo.png',
  'Conservation International (C.I.)': '/Logos/Centro de Excelencia em Sistemas Agroalimentares.jpg',
  'Conservation International': '/Logos/Centro de Excelencia em Sistemas Agroalimentares.jpg',
  'C.I.': '/Logos/Centro de Excelencia em Sistemas Agroalimentares.jpg',
}

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
      preliminaryResults: 'Preliminary Results',
      preliminaryResultsText: 'Reports Available under request',
      requestReport: 'Request Report via Email',
      appliedSkills: 'Applied Skills',
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
      locations: 'O projeto foi realizado em cidades africanas, nomeadamente Kisumu e Nairobi no Quênia, Accra e Tema no Gana e por último Beira e Chimoio em Moçambique, em parceria com instituições africanas como Data4MOZ e Sdi Kenya.',
      methodology: 'O estudo foi realizado em formato participativo onde os cidadãos puderam apontar e mapear as áreas vulneráveis da cidade a perigos climáticos, especialmente inundações, incluindo o nível de profundidade das inundações para os eventos mais recentes.',
      appliedMethodology: 'A metodologia aplicada permitiu reunir a experiência de especialistas locais e partes interessadas sobre a vulnerabilidade da cidade a perigos climáticos através de workshops com instituições governamentais e municipais, ONG, setor privado e organizações comunitárias que estão envolvidas em ação climática, WASH e planeamento urbano.',
      contribution: 'Contribuição',
      contributionText: 'Sob o guarda-chuva da Data4MOZ, como analista de sensoriamento remoto na instituição, meu papel para o Space4All foi desde a coleta de dados de campo e validação de modelos, conduzindo sessões de validação de campo em Kisumo (Quênia) junto com membros da ITC-University of Twente e liderando as atividades em Beira e Chimoio (Moçambique), envolvendo as comunidades locais e partes interessadas para sessões de validação de modelos e reunir subsídios por observações de campo, caminhadas de transecto e mapeamento de assentamentos informais.',
      preliminaryResults: 'Resultados Preliminares',
      preliminaryResultsText: 'Relatórios disponíveis sob pedido',
      requestReport: 'Solicitar Relatório por Email',
      appliedSkills: 'Habilidades Aplicadas',
      institutions: 'Instituições envolvidas',
      furtherInfo: 'Para mais informações',
      contact: 'Lorraine Trento Oliveira (Pesquisadora ITC-UT Space4all)',
    },
    coverImage: '/projects/space4all/Cover.jpg',
    images: [
      { src: '/projects/space4all/Image0.png', alt: 'SPACE4ALL Research Approach', position: 'afterApproach' },
      { src: '/projects/space4all/Image1.png', alt: 'Study countries of the project', position: 'afterLocations' },
      { src: '/projects/space4all/image2.jpg', alt: 'Participatory validation: Kisumo, January 2025', position: 'afterMethodology' },
      { src: '/projects/space4all/Image3.jpg', alt: 'Participatory validation: Beira, February 2025', position: 'afterAppliedMethodology' },
      { src: '/projects/space4all/image4.jpg', alt: 'Field Observation Kisumo, January 2025', position: 'afterContribution' },
    ],
    video: '/projects/space4all/Video.mp4',
    videoDescription: 'Transect Walk in Manyata B Neighbourhood, Kisumu, Kenya, January 2025',
    institutionsList: [
      'ITC-University of Twente',
      'NWO',
      'Data4MOZ',
      'SDI Kenya',
    ],
    appliedSkills: [
      { name: 'GIS', level: 40, color: '#3B82F6' },
      { name: 'Remote Sensing', level: 30, color: '#10B981' },
      { name: 'Community Engagement', level: 30, color: '#F59E0B' },
    ],
  },
  'community-led-nrm': {
    en: {
      title: 'Community-Led Natural Resources Management',
      subtitle: 'Through Participatory Spatial Data: Empowering Communities in the Gorongosa-Marromeu Complex for Sustainable Resource Management',
      period: 'Aug 2024 - Apr 2025',
      overview: 'Overview',
      overviewText: 'This project, funded by USAID, arises from the observation of the fact that the communities in Mozambique, particularly in the central province of Sofala, serve as custodians of natural resources. Beyond their constitutional rights, these communities are entrusted with the following responsibilities: i) Protection and Conservation, II) Sustainability and iii) Livelihood improvement.',
      methodology: 'Carried out in collaboration with Gorongosa National Park and the respective district government, the project aimed to empower local communities in natural resources management through participatory spatial data techniques, including: Enhancing Community Engagement in the Wildlife Crime, through active participation of community members, particularly youth and women in the decision-making processes related to natural resource management and establish an inclusive framework that actively involves community members in resource management decision-making by leveraging data collected by the communities. The execution of the project was guided through the following activities: community mobilization and engagement, promotion of community capacity building and training sessions on community based natural resources management, participatory spatial mapping, data collection using mobile devices, identification and reporting of wildlife crime, and value chain mapping and opportunities.',
      results: 'Results',
      resultsText: '25 members of local natural resource management committees are now able to use mobile devices to collect evidence and report environmental crimes in near real-time through a spatial data-based system, reinforcing their surveillance capabilities against environmental crimes at the community level. 5 communities from Gorongosa National Park buffer zone have been provided with knowledge about identifying alternative livelihoods and trained in biodiversity conservation and the sustainable use of natural resources.',
      appliedSkills: 'Applied Skills',
      institutions: 'Involved institutions',
    },
    pt: {
      title: 'Gestão Comunitária de Recursos Naturais',
      subtitle: 'Através de Dados Espaciais Participativos: Capacitando Comunidades no Complexo Gorongosa-Marromeu para Gestão Sustentável de Recursos',
      period: 'Ago 2024 - Abr 2025',
      overview: 'Visão Geral',
      overviewText: 'Este projeto, financiado pela USAID, surge da observação do fato de que as comunidades em Moçambique, particularmente na província central de Sofala, servem como guardiãs dos recursos naturais. Além dos seus direitos constitucionais, essas comunidades são incumbidas das seguintes responsabilidades: i) Proteção e Conservação, II) Sustentabilidade e iii) Melhoria dos meios de subsistência.',
      methodology: 'Realizado em colaboração com o Parque Nacional da Gorongosa e o governo distrital respectivo, o projeto visou capacitar as comunidades locais na gestão de recursos naturais através de técnicas de dados espaciais participativos, incluindo: Melhorar o Envolvimento Comunitário no Crime contra a Vida Selvagem, através da participação ativa de membros da comunidade, particularmente jovens e mulheres nos processos de tomada de decisão relacionados à gestão de recursos naturais e estabelecer uma estrutura inclusiva que envolva ativamente os membros da comunidade na tomada de decisão de gestão de recursos, aproveitando os dados coletados pelas comunidades. A execução do projeto foi guiada através das seguintes atividades: mobilização e envolvimento comunitário, promoção de capacitação comunitária e sessões de treinamento sobre gestão comunitária de recursos naturais, mapeamento espacial participativo, coleta de dados usando dispositivos móveis, identificação e relato de crimes contra a vida selvagem, e mapeamento da cadeia de valor e oportunidades.',
      results: 'Resultados',
      resultsText: '25 membros de comités locais de gestão de recursos naturais agora são capazes de usar dispositivos móveis para coletar evidências e relatar crimes ambientais quase em tempo real através de um sistema baseado em dados espaciais, reforçando suas capacidades de vigilância contra crimes ambientais ao nível comunitário. 5 comunidades da zona tampão do Parque Nacional da Gorongosa receberam conhecimento sobre a identificação de meios de subsistência alternativos e foram treinadas em conservação da biodiversidade e uso sustentável dos recursos naturais.',
      appliedSkills: 'Habilidades Aplicadas',
      institutions: 'Instituições envolvidas',
    },
    coverImage: '/projects/Community-Led Natural Resources Management trough Participatory Spatial Data/Image.jpg',
    images: [
      { src: '/projects/Community-Led Natural Resources Management trough Participatory Spatial Data/Image 1.jpg', alt: 'Project Launch ceremony (Inhaminga, August 2024)', position: 'afterOverview', showCaption: true },
      { src: '/projects/Community-Led Natural Resources Management trough Participatory Spatial Data/Image 2.jpg', alt: '', position: 'afterMethodology', showCaption: false },
      { src: '/projects/Community-Led Natural Resources Management trough Participatory Spatial Data/Image 4.jpg', alt: '', position: 'afterResults', showCaption: false },
    ],
    institutionsList: [
      'Data4MOZ',
      'USAID',
      'Gorongosa National Park',
      'Cheringoma District Government',
    ],
    appliedSkills: [
      { name: 'Monitoring, Evaluation & Learning', level: 60, color: '#3B82F6' },
      { name: 'Sustainable Livelihoods', level: 15, color: '#10B981' },
      { name: 'GIS', level: 20, color: '#F59E0B' },
      { name: 'Natural Resources Management', level: 5, color: '#EF4444' },
    ],
  },
  luisa: {
    en: {
      title: 'Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)',
      subtitle: 'LUISA Project',
      period: '2024 - Oct. 2025',
      overview: 'Overview',
      overviewText: 'Led by European Space Agency (ESA), This project results from a consortium amongst several institutions engaged in Spatial Data-based solutions in Africa and Europe. The long-term goal of "Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa" (LUISA) is to build the resilience of smallholder farmers and pastoralists in Africa to land use intensification resulting from rapid population growth and climate change. LUISA will achieve this goal by developing a satellite-driven decision-support platform from which policymakers can deliver more effective and reliable carbon monitoring across Africa. Human Appropriation of Net Primary Productivity (HANPP) is a key environmental indicator that helps decision-makers to understand the drivers and consequences of land use intensification on carbon dynamics on a pixel basis over large areas. The African land system is undergoing rapid changes and novel approaches are needed to understand the drivers and consequences of land use intensification, as well as the dependency, vulnerability and resilience caused by climate change. It is paramount to understand Africa\'s potential, vulnerability and resilience for a sustainable agriculture, defined as one that is low-carbon, resource-efficient, and socially inclusive. Therefore, The LUISA Project developed and is implementing new methods, effectively linking and integrating modelling, satellite EO products (Sentinels, Explorers, Meteo missions, ESA-CCI) and dataset with in-situ, stakeholder-generated, social-economic data to advance the estimation of continental Africa potential, vulnerability and resilience for a sustainable agriculture.',
      methodology: 'For in situ data collection to train the model, four use cases were developed in Senegal (Silvopastoral area), Mozambique (Beira Agriculture Growth Corridor), Ethiopia (Highland region of Lake Tana) and Uganda (Mount Elgon Agroforestry Zone). For Mozambique Use case, Mixed research was conducted to collect data to support the remote sensing-based platform for biomass monitoring through HANPP. The qualitative research was based on consultations with stakeholders in the Beira Agricultural Growth Corridor, through guided interviews with key informants. Additionally, Community consultations were carried out through focus group discussions separately with smallholder farmers and forestry operators. Quantitative research was conducted with forestry operators and timber vendors to understand the dynamics of the forestry extraction and agricultural sectors in the region and the factors that contribute to the occurrence of biomass in the region. Databases from private companies and from the provincial government were also gathered.',
      results: 'Results',
      resultsText: 'This mixed approach allowed the development of a robust platform with essential parameters to monitor the HANPP and biomass measurement at continental level.',
      appliedSkills: 'Applied Skills',
      institutions: 'Involved institutions',
      furtherInfo: 'For further information, visit the Official LUISA Portal',
      portalLink: 'https://eo4africa-luisa.org/',
    },
    pt: {
      title: 'Potencial, Vulnerabilidade e Resiliência da Intensidade do Uso da Terra para Agricultura Sustentável em África (LUISA)',
      subtitle: 'Projeto LUISA',
      period: '2024 - Out. 2025',
      overview: 'Visão Geral',
      overviewText: 'Liderado pela Agência Espacial Europeia (ESA), Este projeto resulta de um consórcio entre várias instituições envolvidas em soluções baseadas em Dados Espaciais em África e Europa. O objetivo de longo prazo do "Potencial, Vulnerabilidade e Resiliência da Intensidade do Uso da Terra para Agricultura Sustentável em África" (LUISA) é construir a resiliência de pequenos agricultores e pastores em África à intensificação do uso da terra resultante do rápido crescimento populacional e mudanças climáticas. O LUISA alcançará este objetivo desenvolvendo uma plataforma de apoio à decisão baseada em satélites a partir da qual os formuladores de políticas podem fornecer monitorização de carbono mais eficaz e confiável em toda a África. A Apropriação Humana da Produtividade Primária Líquida (HANPP) é um indicador ambiental chave que ajuda os decisores a compreender os impulsionadores e consequências da intensificação do uso da terra na dinâmica do carbono numa base de pixel sobre grandes áreas. O sistema de uso da terra africano está a passar por mudanças rápidas e são necessárias abordagens novas para compreender os impulsionadores e consequências da intensificação do uso da terra, bem como a dependência, vulnerabilidade e resiliência causadas pelas mudanças climáticas. É fundamental compreender o potencial, vulnerabilidade e resiliência de África para uma agricultura sustentável, definida como uma que é de baixo carbono, eficiente em recursos e socialmente inclusiva. Portanto, o Projeto LUISA desenvolveu e está a implementar novos métodos, ligando e integrando efetivamente modelação, produtos de EO por satélite (Sentinels, Explorers, missões Meteo, ESA-CCI) e conjunto de dados com dados socioeconómicos in-situ, gerados por partes interessadas, para avançar a estimativa do potencial, vulnerabilidade e resiliência da África continental para uma agricultura sustentável.',
      methodology: 'Para a recolha de dados in situ para treinar o modelo, foram desenvolvidos quatro casos de uso no Senegal (área silvopastoril), Moçambique (Corredor de Crescimento Agrícola da Beira), Etiópia (região montanhosa do Lago Tana) e Uganda (Zona Agroflorestal do Monte Elgon). Para o caso de uso de Moçambique, foi conduzida uma investigação mista para recolher dados para apoiar a plataforma baseada em sensoriamento remoto para monitorização de biomassa através do HANPP. A investigação qualitativa baseou-se em consultas com partes interessadas no Corredor de Crescimento Agrícola da Beira, através de entrevistas guiadas com informantes-chave. Além disso, foram realizadas consultas comunitárias através de discussões de grupos focais separadamente com pequenos agricultores e operadores florestais. Foi conduzida investigação quantitativa com operadores florestais e vendedores de madeira para compreender a dinâmica dos setores de extração florestal e agrícola na região e os fatores que contribuem para a ocorrência de biomassa na região. Bases de dados de empresas privadas e do governo provincial também foram recolhidas.',
      results: 'Resultados',
      resultsText: 'Esta abordagem mista permitiu o desenvolvimento de uma plataforma robusta com parâmetros essenciais para monitorizar o HANPP e a medição de biomassa ao nível continental.',
      appliedSkills: 'Habilidades Aplicadas',
      institutions: 'Instituições envolvidas',
      furtherInfo: 'Para mais informações, visite o Portal Oficial LUISA',
      portalLink: 'https://eo4africa-luisa.org/',
    },
    coverImage: '/projects/Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)/IMAGE 1 Cover .jpg',
    images: [
      { src: '/projects/Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)/Image 2.jpg', alt: 'Kick-off visit to the district economic activities service (Nhamatanda, June 2024)', position: 'afterOverview' },
      { src: '/projects/Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)/Image 3.jpg', alt: 'KII Section with Mozambique Sugar-cane company- Tongaat Hulett S.A (Mafambisse, July 2024)', position: 'afterMethodology' },
      { src: '/projects/Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)/Image 4.jpg', alt: 'Focus Group Discussion With Nhampoca Community (Nhamatanda, July 2024)', position: 'afterMethodology' },
      { src: '/projects/Land Use Intensity\'s Potential, Vulnerability and Resilience for Sustainable Agriculture in Africa (LUISA)/Image 5.jpg', alt: 'Data collection at EN6. with wood, charcoal and timber vendors (Tica, July 2024)', position: 'afterMethodology' },
    ],
    institutionsList: [
      'Data4MOZ',
      'European Space Agency (ESA)',
      'Faculty of Geoinformation Science and Earth Observation of University of Twente',
      'Boku University',
      'Gi-Sat',
      'Vito Remote Sensing',
      'Makerere University',
    ],
    appliedSkills: [
      { name: 'Remote Sensing', level: 10, color: '#3B82F6' },
      { name: 'Qualitative Research', level: 50, color: '#10B981' },
      { name: 'Quantitative Research', level: 25, color: '#F59E0B' },
      { name: 'Natural Resources Management', level: 15, color: '#EF4444' },
    ],
  },
  bazaruto: {
    en: {
      title: 'Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area',
      subtitle: 'Participatory Coastal Resources Mapping',
      period: 'Oct. 2023 - Apr. 2024',
      overview: 'Overview',
      overviewText: 'The Greater Bazaruto KBA houses diverse marine ecosystems and because of its abundant biodiversity and diverse landscapes, this area holds significant ecological, economic, and societal importance, with tourism and fisheries serving as primary activities. This unique ecosystem sustains the livelihoods of local communities residing within the BANP and coastal communities in the mainland districts of Vilankulos, Inhassoro, and Govuro. However, the habitats and species face threats from illegal and unsustainable fishing practices, unregulated natural resource utilization. Therefore, due to aforementioned challenges and the imperative to enhance decision making for biodiversity conservation and community engagement, this research was conducted, aiming to i) geographically map locations that are regarded as crucial for providing essential resources and services for both island and mainland communities, ii) Provide a comprehensive understanding of how these significant sites are currently being utilized and by whom within the community, iii) Identify which types of usage are deemed sustainable and harmonious, as opposed to those that may generate conflicts, iv) Investigate and document the perspectives of local communities on the anticipated changes in these areas over the next decade, including alterations in distribution and utilization patterns resulting from climate change and other environmental factors.',
      methodology: 'The study was conducted through a participatory spatial mapping in three different levels/categories, namely: Distrital level with the main stakeholder in natural resources management and biodiversity conservation and community level, including Communities Fishering Council (CCPs) within Vilankulo and Inhassoro districts.',
      methodologyPart2: 'At district level, these workshops aimed to assess the current status of coastal planning and engage stakeholders in discussions regarding fisheries resource management across the province.',
      methodologyPart3: 'At community level (inland) Participatory spatial mapping was conducted separately with CCPs of Vuca, Petane, Mukokuene, Tsondzo, Mangarelane, Nhagondzo and Chivambofrom Inhassoro district and Mangalisse, Mabandene, Mondego and Chichocane from Vilankulo district, where was gathered high-value information regarding coastal zoning in fishing contest and biodiversity and ecosystems conservation efforts carried out at the community level in order to maintain the fishing activity sustainable.',
      methodologyPart4: 'The research covered the island\'s community within the archipelago. The communities from Magaruque, Benguera and Bazaruto islands provided extremely relevant information, given their exclusive dependence on marine resources as a means of subsistence, they revealed in-depth knowledge about coastal zoning in the region of the Greater BazarutoKBA, which enabled the creation of more precise maps with more in-depth details about fishing areas, tourism, mangroves, the occurrence of coral reefs, dugong and turtle routes, etc.',
      results: 'Results',
      resultsText: 'Available under request',
      appliedSkills: 'Applied Skills',
      contribution: 'Contribution',
      contributionText: 'As part of the Data4MOZ team, I contributed to the design and implementation of participatory spatial mapping activities at district, community, and island levels, facilitating workshops and data collection sessions with local communities and stakeholders.',
      institutions: 'Involved institutions',
    },
    pt: {
      title: 'Mapeamento Participativo de Recursos Costeiros na Área Chave de Biodiversidade do Grande Bazaruto',
      subtitle: 'Mapeamento Participativo de Recursos Costeiros',
      period: 'Out. 2023 - Abr. 2024',
      overview: 'Visão Geral',
      overviewText: 'A Grande Área de Biodiversidade Chave (KBA) de Bazaruto abriga diversos ecossistemas marinhos e, devido à sua abundante biodiversidade e paisagens diversas, esta área possui importância ecológica, económica e social significativa, com o turismo e a pesca servindo como atividades primárias. Este ecossistema único sustenta os meios de subsistência das comunidades locais que residem dentro do BANP e das comunidades costeiras nos distritos continentais de Vilankulos, Inhassoro e Govuro. No entanto, os habitats e espécies enfrentam ameaças de práticas de pesca ilegais e insustentáveis, utilização não regulamentada de recursos naturais. Portanto, devido aos desafios mencionados e ao imperativo de melhorar a tomada de decisões para a conservação da biodiversidade e o envolvimento comunitário, esta pesquisa foi conduzida, visando i) mapear geograficamente locais que são considerados cruciais para fornecer recursos e serviços essenciais tanto para comunidades insulares quanto continentais, ii) Fornecer uma compreensão abrangente de como estes locais significativos estão atualmente sendo utilizados e por quem dentro da comunidade, iii) Identificar quais tipos de uso são considerados sustentáveis e harmoniosos, em oposição àqueles que podem gerar conflitos, iv) Investigar e documentar as perspetivas das comunidades locais sobre as mudanças antecipadas nestas áreas na próxima década, incluindo alterações nos padrões de distribuição e utilização resultantes das mudanças climáticas e outros fatores ambientais.',
      methodology: 'O estudo foi conduzido através de um mapeamento espacial participativo em três níveis/categorias diferentes, nomeadamente: Nível distrital com as principais partes interessadas na gestão de recursos naturais e conservação da biodiversidade e nível comunitário, incluindo os Conselhos Comunitários de Pesca (CCPs) nos distritos de Vilankulo e Inhassoro.',
      methodologyPart2: 'Ao nível distrital, estes workshops visaram avaliar o estado atual do planeamento costeiro e envolver as partes interessadas em discussões sobre a gestão dos recursos pesqueiros em toda a província.',
      methodologyPart3: 'Ao nível comunitário (interior) O mapeamento espacial participativo foi conduzido separadamente com os CCPs de Vuca, Petane, Mukokuene, Tsondzo, Mangarelane, Nhagondzo e Chivambofrom do distrito de Inhassoro e Mangalisse, Mabandene, Mondego e Chichocane do distrito de Vilankulo, onde foi recolhida informação de alto valor sobre o zoneamento costeiro no contexto da pesca e os esforços de conservação da biodiversidade e ecossistemas realizados ao nível comunitário para manter a atividade pesqueira sustentável.',
      methodologyPart4: 'A pesquisa cobriu a comunidade das ilhas dentro do arquipélago. As comunidades das ilhas de Magaruque, Benguera e Bazaruto forneceram informações extremamente relevantes, dado a sua dependência exclusiva dos recursos marinhos como meio de subsistência, revelaram conhecimento profundo sobre o zoneamento costeiro na região da Grande KBA de Bazaruto, o que permitiu a criação de mapas mais precisos com detalhes mais aprofundados sobre áreas de pesca, turismo, mangais, ocorrência de recifes de coral, rotas de dugongos e tartarugas, etc.',
      results: 'Resultados',
      resultsText: 'Disponível sob pedido',
      appliedSkills: 'Habilidades Aplicadas',
      contribution: 'Contribuição',
      contributionText: 'Como parte da equipa Data4MOZ, contribuí para o desenho e implementação de atividades de mapeamento espacial participativo aos níveis distrital, comunitário e insular, facilitando workshops e sessões de coleta de dados com comunidades locais e partes interessadas.',
      institutions: 'Instituições envolvidas',
    },
    coverImage: '/projects/Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area/Image 1_ Cover Image.jpg',
    images: [
      { src: '/projects/Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area/Image 2 Workshop at District Level.JPG', alt: 'Stakeholders Participatory Mapping (Inhassoro, November 2023)', position: 'afterOverview' },
      { src: '/projects/Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area/Image 4 Island Community Participatory Mapping.JPG', alt: 'Community participatory mapping (Benguerra)', position: 'afterMethodologyPart2' },
      { src: '/projects/Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area/Image 3 _ CCP Participatory Mapping.jpg', alt: 'CCP Participatory mapping', position: 'afterMethodologyPart3' },
      { src: '/projects/Participatory Coastal Resources Mapping in Greater Bazaruto Key Biodiversity Area/Image 4 Island Community Participatory Mapping.JPG', alt: 'Participatory mapping (Magarruque island-Bazaruto Archipelago, December, 2023)', position: 'afterMethodologyPart4' },
    ],
    institutionsList: [
      'Data4MOZ',
      'African Parks',
      'Bazaruto Archipelago National Park',
      'ANAC',
      'Conservation International (C.I.)',
    ],
    appliedSkills: [
      { name: 'GIS', level: 15, color: '#3B82F6' },
      { name: 'Remote Sensing', level: 5, color: '#10B981' },
      { name: 'Community Engagement', level: 25, color: '#F59E0B' },
      { name: 'Biodiversity Conservation', level: 20, color: '#EF4444' },
      { name: 'Qualitative Research', level: 25, color: '#8B5CF6' },
    ],
  },
  'fisheries-bazaruto': {
    en: {
      title: 'Fisheries Value Chain Mapping and Community Governance in Bazaruto Archipelago National Park',
      subtitle: 'Fisheries Value Chain Mapping',
      period: '2024',
      overview: 'Overview',
      overviewText: 'The fisheries value chain mapping and governance assessment aims at understanding the effects of the fisheries activities across the region, including the influence of community governance structures as the mechanisms for a participatory marine resources management. The project seeks to deliver a comprehensive and community-informed assessment of the fisheries value chain in and around the Bazaruto Archipelago National Park. The overall objective was to generate evidence to inform more sustainable and inclusive fisheries management while supporting the socio-economic well-being of local communities. Recognizing the central role of fisheries as the primary economic activity in the region, the project adopted a nuanced mapping approach that captured the micro-dynamics of the value chain at the community level.',
      methodology: 'This involved extensive sampling and site visits to all communities within and around BANP, enabling a detailed understanding of localized practices, key actors, and interactions across the fishing economy. The assessment also examined the multi-scalar dimensions of the fisheries value chain, acknowledging that fish products from the BANP region are not only consumed locally but also transported to major urban markets such as Maputo, Beira, and Chimoio. As such, the study incorporated both local and national-level actors to provide a comprehensive picture of how fish commodities move across regions and supply systems. Additionally, 17 community committees were created throughout the archipelago as a way to strengthen community management of natural resources. The committees were legalized and trained so that they can actively participate in decision-making processes that influence the daily lives of the communities.',
      contribution: 'Contribution',
      contributionText: 'As part of the Data4MOZ team, I contributed to the design and implementation of fisheries value chain mapping activities and community governance training sessions, working closely with local communities and stakeholders to improve community participation and involvement in resource management.',
      appliedSkills: 'Applied Skills',
      institutions: 'Involved institutions',
    },
    pt: {
      title: 'Mapeamento da Cadeia de Valor das Pescas e Governança Comunitária no Parque Nacional do Arquipélago de Bazaruto',
      subtitle: 'Mapeamento da Cadeia de Valor das Pescas',
      period: '2024',
      overview: 'Visão Geral',
      overviewText: 'O mapeamento da cadeia de valor das pescas e a avaliação da governança visam compreender os efeitos das atividades pesqueiras em toda a região, incluindo a influência das estruturas de governança comunitária como mecanismos para uma gestão participativa dos recursos marinhos. O projeto visa fornecer uma avaliação abrangente e informada pela comunidade da cadeia de valor das pescas dentro e ao redor do Parque Nacional do Arquipélago de Bazaruto. O objetivo geral foi gerar evidências para informar uma gestão pesqueira mais sustentável e inclusiva, apoiando o bem-estar socioeconómico das comunidades locais. Reconhecendo o papel central das pescas como atividade económica primária na região, o projeto adotou uma abordagem de mapeamento diferenciada que capturou as micro-dinâmicas da cadeia de valor ao nível comunitário.',
      methodology: 'Isso envolveu uma amostragem extensiva e visitas a todos os locais de todas as comunidades dentro e ao redor do BANP, permitindo uma compreensão detalhada das práticas localizadas, atores-chave e interações na economia pesqueira. A avaliação também examinou as dimensões multi-escalares da cadeia de valor das pescas, reconhecendo que os produtos pesqueiros da região do BANP não são apenas consumidos localmente, mas também transportados para grandes mercados urbanos como Maputo, Beira e Chimoio. Como tal, o estudo incorporou tanto atores locais quanto nacionais para fornecer uma imagem abrangente de como as mercadorias de peixe se movem entre regiões e sistemas de abastecimento. Além disso, 17 comités comunitários foram criados em todo o arquipélago como forma de fortalecer a gestão comunitária dos recursos naturais. Os comités foram legalizados e treinados para que possam participar ativamente nos processos de tomada de decisão que influenciam a vida quotidiana das comunidades.',
      contribution: 'Contribuição',
      contributionText: 'Como parte da equipa Data4MOZ, contribuí para o desenho e implementação de atividades de mapeamento da cadeia de valor das pescas e sessões de formação em governança comunitária, trabalhando em estreita colaboração com comunidades locais e partes interessadas para melhorar a participação e envolvimento comunitário na gestão de recursos.',
      appliedSkills: 'Habilidades Aplicadas',
      institutions: 'Instituições envolvidas',
    },
    coverImage: '/projects/Fisheries Value Chain Mapping and Community Governance in Bazaruto Archipelago National Park/Cover Image (1).jpg',
    images: [
      { src: '/projects/Fisheries Value Chain Mapping and Community Governance in Bazaruto Archipelago National Park/Image 2 (1).jpg', alt: 'Field data collection (Inhassoro, May 2023)', position: 'afterOverview' },
      { src: '/projects/Fisheries Value Chain Mapping and Community Governance in Bazaruto Archipelago National Park/Image 3 (1).jpg', alt: 'Household survey (Bazaruto, May 2023)', position: 'afterMethodology' },
      { src: '/projects/Fisheries Value Chain Mapping and Community Governance in Bazaruto Archipelago National Park/Image 4.png', alt: 'Community councils establishment (April, 2024)', position: 'afterContribution' },
    ],
    institutionsList: [
      'Data4MOZ',
      'Bazaruto Archipelago National Park',
      'African Parks',
      'ANAC',
    ],
    appliedSkills: [
      { name: 'Biodiversity Conservation', level: 5, color: '#8B5CF6' },
      { name: 'Data Analysis', level: 35, color: '#3B82F6' },
      { name: 'Quantitative Research', level: 15, color: '#10B981' },
      { name: 'Qualitative Research', level: 10, color: '#F59E0B' },
      { name: 'Community Engagement', level: 15, color: '#EF4444' },
      { name: 'Natural Resources Management', level: 20, color: '#06B6D4' },
    ],
  },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const slug = params?.slug as string
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const project = projectData[slug]
  const t = project?.[language] || project?.en
  const images = project?.images || []

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === images.length - 1 ? 0 : prev + 1
        )
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [images.length])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {language === 'en' ? 'Project not found' : 'Projeto não encontrado'}
          </h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            {language === 'en' ? 'Go back home' : 'Voltar ao início'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-dark/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      
      <Navbar />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Back Button Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <motion.button
              onClick={() => router.back()}
              whileHover={{ x: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-500 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center text-white w-full md:w-auto"
            >
              <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
              <span className="font-medium">{language === 'en' ? 'Back to projects' : 'Voltar aos projetos'}</span>
            </motion.button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t.title}
              </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              {t.subtitle}
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full">
              <p className="text-primary-600 dark:text-primary-400 font-medium">
              {t.period}
            </p>
          </div>
          </motion.div>

          {/* Cover Image */}
          {project.coverImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
                <Image
                  src={project.coverImage}
                  alt="Cover Image"
                    fill
                    className="object-cover"
                />
              </div>
            </motion.div>
          )}

          {/* Content */}
          <div className="space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-1 h-8 bg-primary-500 rounded-full mr-4"></span>
                      {t.overview}
                    </h2>
              <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                  <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {t.overviewText?.split('(https://www.itc.nl/)').map((part: string, index: number, array: string[]) => {
                    if (index < array.length - 1) {
                      return (
                        <span key={index}>
                          {part}
                          <a
                            href="https://www.itc.nl/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline"
                          >
                            https://www.itc.nl/
                          </a>
                        </span>
                      )
                    }
                    return <span key={index}>{part}</span>
                  })}
                </div>
                {/* Image after Overview (for fisheries-bazaruto, community-led-nrm, and luisa) */}
                {images.find((img: any) => img.position === 'afterOverview') && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="my-8"
                  >
                    <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                      <Image
                        src={images.find((img: any) => img.position === 'afterOverview')?.src}
                        alt={images.find((img: any) => img.position === 'afterOverview')?.alt}
                        fill
                        className="object-cover"
                      />
                      {/* Caption overlay - always show if alt exists */}
                      {images.find((img: any) => img.position === 'afterOverview')?.alt && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
                          <p className="text-center text-white text-sm md:text-base italic font-medium">
                            {images.find((img: any) => img.position === 'afterOverview')?.alt}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
                {t.approach && (
                  <>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {t.approach}
                </p>
                    {t.locations && (
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {t.locations}
                      </p>
                    )}
                    {/* Image 0: SPACE4ALL Research Approach */}
                    {images.find((img: any) => img.position === 'afterApproach') && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="my-8"
                      >
                        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                          <Image
                            src={images.find((img: any) => img.position === 'afterApproach')?.src}
                            alt={images.find((img: any) => img.position === 'afterApproach')?.alt}
                            fill
                            className="object-cover"
                          />
                          {/* Caption overlay - always show if alt exists */}
                          {images.find((img: any) => img.position === 'afterApproach')?.alt && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
                              <p className="text-center text-white text-sm md:text-base italic font-medium">
                                {images.find((img: any) => img.position === 'afterApproach')?.alt}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </>
                )}
                {t.objectives && (
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.objectives}
                  </p>
                )}
              </div>
            </motion.section>

            {/* Image 1: Study countries */}
            {images.find((img: any) => img.position === 'afterLocations') && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                  <Image
                    src={images.find((img: any) => img.position === 'afterLocations')?.src}
                    alt={images.find((img: any) => img.position === 'afterLocations')?.alt}
                    fill
                    className="object-cover"
                  />
                  {/* Caption overlay - always show if alt exists */}
                  {images.find((img: any) => img.position === 'afterLocations')?.alt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
                      <p className="text-center text-white text-sm md:text-base italic font-medium">
                        {images.find((img: any) => img.position === 'afterLocations')?.alt}
                </p>
                      </div>
                  )}
                </div>
              </motion.section>
            )}

            {t.methodology && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="w-1 h-6 bg-primary-500 rounded-full mr-3"></span>
                {language === 'en' ? 'Methodology' : 'Metodologia'}
              </h3>
                <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t.methodology}
                </p>
                  </div>
              </motion.section>
            )}

            {/* Image after Overview (for bazaruto) */}
            {images.find((img: any) => img.position === 'afterOverview') && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                  <Image
                    src={images.find((img: any) => img.position === 'afterOverview')?.src}
                    alt={images.find((img: any) => img.position === 'afterOverview')?.alt}
                    fill
                    className="object-cover"
                  />
                  {/* Caption overlay - always show if alt exists */}
                  {images.find((img: any) => img.position === 'afterOverview')?.alt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
                      <p className="text-center text-white text-sm md:text-base italic font-medium">
                        {images.find((img: any) => img.position === 'afterOverview')?.alt}
                      </p>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {/* Methodology Part 2 (for bazaruto) */}
            {t.methodologyPart2 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.methodologyPart2}
                  </p>
                </div>
              </motion.section>
            )}

            {/* Image after Methodology Part 2 (for bazaruto) */}
            {images.find((img: any) => img.position === 'afterMethodologyPart2') && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                  <Image
                    src={images.find((img: any) => img.position === 'afterMethodologyPart2')?.src}
                    alt={images.find((img: any) => img.position === 'afterMethodologyPart2')?.alt}
                    fill
                    className="object-cover"
                  />
                  {/* Caption overlay - always show if alt exists */}
                  {images.find((img: any) => img.position === 'afterMethodologyPart2')?.alt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
                      <p className="text-center text-white text-sm md:text-base italic font-medium">
                        {images.find((img: any) => img.position === 'afterMethodologyPart2')?.alt}
                      </p>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {/* Methodology Part 3 (for bazaruto) */}
            {t.methodologyPart3 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.methodologyPart3}
                  </p>
                </div>
              </motion.section>
            )}

            {/* Image after Methodology Part 3 (for bazaruto) */}
            {images.find((img: any) => img.position === 'afterMethodologyPart3') && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                  <Image
                    src={images.find((img: any) => img.position === 'afterMethodologyPart3')?.src}
                    alt={images.find((img: any) => img.position === 'afterMethodologyPart3')?.alt}
                    fill
                    className="object-cover"
                  />
                  {/* Caption overlay - always show if alt exists */}
                  {images.find((img: any) => img.position === 'afterMethodologyPart3')?.alt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
                      <p className="text-center text-white text-sm md:text-base italic font-medium">
                        {images.find((img: any) => img.position === 'afterMethodologyPart3')?.alt}
                      </p>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {/* Methodology Part 4 (for bazaruto) */}
            {t.methodologyPart4 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.methodologyPart4}
                  </p>
                </div>
              </motion.section>
            )}

            {/* Image after Methodology Part 4 (for bazaruto) */}
            {images.find((img: any) => img.position === 'afterMethodologyPart4') && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                  <Image
                    src={images.find((img: any) => img.position === 'afterMethodologyPart4')?.src}
                    alt={images.find((img: any) => img.position === 'afterMethodologyPart4')?.alt}
                    fill
                    className="object-cover"
                  />
                  {/* Caption overlay - always show if alt exists */}
                  {images.find((img: any) => img.position === 'afterMethodologyPart4')?.alt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
                      <p className="text-center text-white text-sm md:text-base italic font-medium">
                        {images.find((img: any) => img.position === 'afterMethodologyPart4')?.alt}
                      </p>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {/* Images after Methodology (for other projects) */}
            {images.filter((img: any) => img.position === 'afterMethodology').map((img: any, index: number) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                  <Image
                    src={img.src}
                    alt={img.alt || ''}
                    fill
                    className="object-cover"
                  />
                  {/* Caption overlay - always show if alt exists */}
                  {img.alt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
                      <p className="text-center text-white text-sm md:text-base italic font-medium">
                        {img.alt}
                      </p>
                    </div>
                  )}
                </div>
              </motion.section>
            ))}

            {/* Applied Methodology */}
            {t.appliedMethodology && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.appliedMethodology}
                  </p>
                </div>
              </motion.section>
            )}

            {/* Image 3: Participatory validation Beira */}
            {images.find((img: any) => img.position === 'afterAppliedMethodology') && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                  <Image
                    src={images.find((img: any) => img.position === 'afterAppliedMethodology')?.src}
                    alt={images.find((img: any) => img.position === 'afterAppliedMethodology')?.alt}
                    fill
                    className="object-cover"
                  />
                  {/* Caption overlay - always show if alt exists */}
                  {images.find((img: any) => img.position === 'afterAppliedMethodology')?.alt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
                      <p className="text-center text-white text-sm md:text-base italic font-medium">
                        {images.find((img: any) => img.position === 'afterAppliedMethodology')?.alt}
                      </p>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {t.contribution && t.contributionText && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="w-1 h-8 bg-primary-500 rounded-full mr-4"></span>
                    {t.contribution}
                  </h2>
                <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t.contributionText}
                </p>
              </div>
              </motion.section>
            )}

            {/* Image 4: Field Observation / Community councils */}
            {images.find((img: any) => img.position === 'afterContribution') && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                  <Image
                    src={images.find((img: any) => img.position === 'afterContribution')?.src}
                    alt={images.find((img: any) => img.position === 'afterContribution')?.alt}
                    fill
                    className="object-cover"
                  />
                  {/* Caption overlay - always show if alt exists */}
                  {images.find((img: any) => img.position === 'afterContribution')?.alt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
                      <p className="text-center text-white text-sm md:text-base italic font-medium">
                        {images.find((img: any) => img.position === 'afterContribution')?.alt}
                      </p>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {/* Results */}
            {t.results && t.resultsText && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="w-1 h-8 bg-primary-500 rounded-full mr-4"></span>
                  {t.results}
                </h2>
                <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.resultsText}
                  </p>
                </div>
              </motion.section>
            )}

            {/* Images after Results */}
            {images.filter((img: any) => img.position === 'afterResults').map((img: any, index: number) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                  <Image
                    src={img.src}
                    alt={img.alt || ''}
                    fill
                    className="object-cover"
                  />
                  {/* Caption overlay - always show if alt exists */}
                  {img.alt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
                      <p className="text-center text-white text-sm md:text-base italic font-medium">
                        {img.alt}
                      </p>
                    </div>
                  )}
                </div>
              </motion.section>
            ))}

            {/* Video */}
            {project.video && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                  <video
                    src={project.video}
                    controls
                    className="w-full h-auto"
                  />
                  {project.videoDescription && (
                    <p className="text-center text-gray-600 dark:text-gray-400 text-sm md:text-base italic py-4 px-6 font-medium">
                      {project.videoDescription}
                    </p>
                  )}
                </div>
              </motion.section>
            )}

            {/* Applied Skills */}
            {project.appliedSkills && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="w-1 h-8 bg-primary-500 rounded-full mr-4"></span>
                  {t.appliedSkills}
                </h2>
                <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                  <PizzaChart skills={project.appliedSkills} />
                </div>
              </motion.section>
            )}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-1 h-6 bg-primary-500 rounded-full mr-3"></span>
                {t.institutions}
              </h3>
              <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                <div className="flex flex-wrap gap-6 items-center justify-center md:justify-start">
                  {project.institutionsList?.map((institution: string, index: number) => {
                    const logoPath = institutionLogos[institution] || null
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="relative w-32 h-20 bg-white dark:bg-dark-surface rounded-xl flex items-center justify-center p-3 border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                      >
                        {logoPath ? (
                          <Image
                            src={logoPath}
                            alt={institution}
                            width={120}
                            height={60}
                            className="object-contain max-w-full max-h-full"
                            unoptimized
                          />
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400 text-xs text-center font-medium">
                            {institution}
                          </span>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

