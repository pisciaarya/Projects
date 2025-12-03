const map = L.map('map').setView([28.3949, 84.1240], 7);
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

const googleLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google Maps'
});

const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri'
});

const boundaryLayer = L.layerGroup();
const districtsLayer = L.layerGroup();
const provincesLayer = L.layerGroup();
const lidarProjectsLayer = L.layerGroup();
const uavProjectsLayer = L.layerGroup();

const baseLayers = {
    "OpenStreetMap": osm,
    "Google Streets": googleLayer,
    "Satellite": satelliteLayer
};

const overlayLayers = {
    "Boundary": boundaryLayer,
    "Districts": districtsLayer.addTo(map),
    "Provinces": provincesLayer,
    "LIDAR Projects": lidarProjectsLayer,
    "UAV Projects": uavProjectsLayer
};

L.control.layers(baseLayers, overlayLayers).addTo(map);
const lidarDescriptions = {
    "Melamchi": "Jan 2023 – Oct 24<br><strong>LIDAR SURVEY OF MELAMCHI HEADWORKS AREA-PHASE I, PHASE II AND PHASE III</strong><br>Client: Melamchi Water Supply Development Board",
    "Lalitpur": "Feb 2023<br><strong>UAV Lidar Survey (150 ha)</strong><br>Client: NEA Engineering Company LTD, Thapathali, Kathmandu",
    "Bara": "May 2023<br><strong>UAV Lidar Survey (20 ha)</strong><br>Client: NEA Engineering Company LTD, Thapathali, Kathmandu",
    "West Seti – Dododhara": "July 2023<br><strong>LiDAR Survey of Detail Feasibility Study of Banlek (West Seti)-Dododhara 400kV Transmission Line Project</strong><br>Client: NEA Engineering Company LTD, Thapathali, Kathmandu",
    "Tamor-Mewa HPP": "Sep 2023<br><strong>UAV LIDAR Survey of Tamor-Mewa HPP (128 MW)</strong><br>Client: Tamor Mewa Hydropower Project Board",
    "Dukuchap-Sirutar-Nala Gumba-Lapsifedi": "October 23<br><strong>UAV LIDAR Survey of VOIDS (Dukuchap-Sirutar-Nala Gumba-Lapsifedi) 220 KV Transmission Line</strong><br>Client: Rajdevi Engineering Consultant",
    "Kabeli Corridor": "Jan 2024<br><strong>Preparation of Topographic Base Map using Very High- Resolution Aerial Orthophoto based on UAV Platform and Topographic survey for Kabeli Corridor 132 kV Transmission Line Project</strong><br>Client: NEA ENGINEERING COMPANY LTD., Thapathali, Kathmandu",
    "Marin Khola": "Jan 2024<br><strong>Preparation of Topographic Base Map using Very High-Resolution Aerial Orthophoto based on UAV Platform and Topographic survey</strong><br>Client: Office of Rural Municipal Executive, Marin Rural Municipality.",
    "Ikhuwa Khola": "June 2024<br><strong>Preparation of Topographic Map, Generation of High Resolution DEM and Orthophoto with application of Drone/UAV based LiDAR Survey of Ikhuwa Khola Hydropower Project(IKHPP)</strong><br>Client: Chilime Engineering and Services Company Limited, Maharajgunj, Kathmandu",
    "Lekhnath-Damauli": "August 2024<br><strong>Aerial LiDAR Survey works in Leknath-Damauli 220kV Transmission Line Project</strong><br>Client: KALI CONSULTANT PVT. LTD, New Baneshwor, Kathmandu",
    "Madhya Chameliya": "September 2024<br><strong>Preparation of Topographic Map, Generation of High-Resolution DEM and Orthophoto with application of Drone/UAV based LiDAR Survey of Madhya Chameliya Hydropower Project (MCHPP)</strong><br>Client: DARCHULA POWER PRIVATE LIMITED, Kupondole, Lalitpur",
    "Tamor Khola": "September 2024<br><strong>Preparation of Topographic Map, Generation of High-Resolution DEM and Orthophoto with application of Drone/UAV based LiDAR Survey of 132 KV Transmission Line project of Tamor Khola 5 Hydropower Project</strong><br>Client: RIVER SIDE HYDRO ENERGY (PVT) LIMITED (RSHEPL), Kupondole, Lalitpur",
    "Landruk Modi": "December 2024<br><strong>UAV LiDAR Survey of Landruk Modi Hydroelectric Project, 86.59 MW (LMHEP)</strong><br>Client: ANNAPURNA VIDYUT BIKASH COMPANY PVT LTD, Kathmandu, Nepal",
    "Pikhuwa-Tumlingtar": "May 2025<br><strong>Aerial LiDAR Survey works in Upper Pikhuwa- Tumlingtar 132kV Transmission Line Project</strong><br>Client: PHIKUWA KHOLA HYDROPOWER LIMITED, SUMNIMA HYDRO POWER COMPANY PVT. LTD, TAKSAR PIKHUWA KHOLA HYDROPOWER LIMITED, Kathmandu, Nepal",
    "Lower Tirshuli": "June 2025<br><strong>UAV LiDAR Survey of Lower Trishuli Hydropower Project, 117.72 MW (LTHPP)</strong><br>Client: GIDRO ENERGIYA COMPANY LTD, Maharajganj, Kathmandu, Nepal",
    "Lower Chameliya": "June 2025<br><strong>Preparation of Topographic Map, Generation of High-Resolution DEM and Orthophoto with application of Drone/UAV based LiDAR Survey of Lower Chameliya Hydropower Project (LCHPP)</strong><br>Client: KHAPTAD POWER COMPANY PRIVATE LIMITED, Buddhanagar, Kathmandu",
    "Marshyangdi": "July 2025<br><strong>UAV LiDAR Survey of Marshyangdi Hydropower Project (MHPP)</strong><br>Client: INNOVATIVE ENGINEERING SERVICES PVT LTD, Lalitpur, Nepal",
    "Chhujung Khola": "September 2025<br><strong>Preparation of Topographic Map, Generation of High-Resolution DEM and Orthophoto with application of Drone/UAV based LiDAR Survey of 220 KV Double Circuit Transmission Line project of Chhujung Khola Hydropower Project</strong><br>Client: SANGRILA URJA LIMITED, Kathmandu"
};

const uavDescriptions = {
    "Aadhikhola": "July 2018<br><strong>ANALYSIS OF CHANGE IN COURSE OF AADHIKHOLA USING UAV</strong><br>Syangja district<br>Analyzed the changes in the Aadhikhola river's course between 2010 and 2019 using UAVs and satellite imagery. The study focused on a 4.5 km section in Nepal's Syangja district, documenting significant channel morphology changes, including land erosion and accretion, as the river shifted from a linear to a meandering form.",
    "Kanchanpur": "March 2023<br><strong>AS BUILT MAPS OF KANCHANPUR ROAD M2 AND M3</strong>",
    "Birgunj Ortho": "<strong>Birgunj Ortho with TS Data</strong>",
    "Underground Transmission Line of Birgunj": "November 2024<br><strong>UAV Survey of Underground Transmission Line of Birgunj</strong><br>The Birgunj Underground Transmission Line Project involves burying a 132 kV power line in Birgunj, Nepal, to replace overhead lines and improve safety and reliability. An initial drone survey found that routing the line through the designated 2-meter buffer zone outside the main Right of Way (ROW) was too costly due to the high density of existing buildings on both sides (90 on the left, 101 on the right). The final, cost-effective decision was to instead route the underground line along the shoulder of the existing road, which avoids high compensation costs and minimizes community disruption.<br>Client: Prasauni Birgunj 132 kV Underground Electricity Transmission Line Project, Grid Development Department, Transmission Directorate, Nepal Electricity Authority Kharipati, Bhaktapur, Nepal",
    "Birgunj": "<strong>TRANSMISSION LINE UNDERGROUND PROJECT AT BIRGUNJ</strong>",
    "Dhaubadi": "February 2023<br><strong>UAV based Photogrammetry with DGPS survey for outcrop mapping at Dhaubadi Iron Ore Deposit, East Nawalparasi, Gandaki Province, Nepal</strong><br>This project utilized Unmanned Aerial Vehicles (UAVs) and DGPS photogrammetry for the outcrop mapping of the Dhaubadi Iron Ore Deposit in East Nawalparasi, Gandaki Province, Nepal. The survey covered an area of approximately 10 sq. km using a DJI Phantom 4 Pro V2 drone. The primary goal was to provide accurate, comprehensive, and high-resolution spatial data for the mining site, which is beneficial for mineral exploration, mapping, and enhancing productivity in the mining sector.",
    "Kapilvastu": "April 2024<br><strong>UAV Survey of Kapilvastu Municipality Core Area for Infrastructure Assessment</strong><br>This project conducted a UAV (Drone) survey of the Kapilvastu Municipality Core Area to perform a comprehensive Infrastructure Assessment. The survey used photogrammetry to generate high-precision data, including Topographic Maps, Contour Maps, and Orthophotos. This data is critical for authorities to analyze road safety, identify flood-prone areas, and strategically plan future maintenance and urban development.",
    "Godavari": "<strong>Feasibility Survey of Godavari Corridor Road Site using UAV</strong>",
    "Industrial Village – Sunwal": "June 2020<br><strong>Industrial Village – Sunwal</strong><br>This project involves preparing a Detailed Project Report (DPR) for the establishment of an Industrial Village in Sunwal Municipality, Nawalparasi. The scope of work included identifying potential local industries, conducting detailed topographic and socio-economic surveys, and developing a comprehensive Master Plan for land use and zoning. Key deliverables covered the detailed engineering design, layout, cost estimation, and economic analysis for all essential infrastructure, aiming to increase local employment and foster sustainable industrialization.",
    "Kapilvastu Municipality(Road Safety)": "April 2024<br><strong>UAV Survey of Kapilvastu Municipality Core Area for Infrastructure Assessment (Road Safety)</strong><br>This project conducted a comprehensive Road Safety Assessment of the Kapilvastu Municipality Core Area, serving as Volume II of a larger UAV survey for infrastructure evaluation. The assessment systematically evaluated existing road infrastructure and drainage systems against urban standards, aiming to identify potential hazards, low-lying areas, and associated public health risks. Key outcomes include a detailed road asset inventory, an analysis of unsafe road user behavior, and the creation of a Risk Map to guide interventions for improving both infrastructure design and overall safety.<br>Client: HERD International, Bhaisepati, Lalitpur",
    "Hetauda": "June 2022<br><strong>Topographical Survey of Hetauda Mining Site using UAV</strong><br>This project successfully conducted a Topographical Survey of the 155 hectare Hetauda Mining Site in Kailash Rural Municipality using Unmanned Aerial Vehicles (UAVs) for mapping and planning purposes. The survey utilized DGPS Ground Control Points to establish permanent benchmarks, ensuring the accuracy and precision of the collected data. Key outputs delivered included a 1:5000 scale Topographic Map, a Contour Map with 5m intervals, and a high-resolution Orthophoto Map that will be used by the client for future road, transmission line alignment, and general planning purposes.<br>Client: Madan Bhandari University of Science and Technology Development Board",
    "HONGU KHOLA": "November 2017<br><strong>HONGU KHOLA HYDROPOWER PROJECT (29.62 MW)</strong><br>This project conducted a UAV-based Aerial Survey for the 29.62 MW Hongu Khola Hydropower Project in the remote Solukhumbu District to provide accurate site data and better visualization for design purposes. The survey involved photogrammetry using drones, establishing seven Ground Control Points (GCPs) based on previous DGPS survey data, and meticulous flight planning with 75% image overlap to ensure high accuracy. Key outputs included a Digital Terrain Model (DTM), Digital Surface Model (DSM), a geo-referenced Orthomosaic, and a 3D model covering the headworks, powerhouse, and water alignment.<br>Client: SWACHCHHA URJA BIKAS (P.) LTD., Samakhushi, Kathmandu",
    "Jhapa": "<strong>Jhapa MSA Orthoclear</strong>",
    "SUKLAPHANTA": "<strong>AS BUILT MAP OF ISWM, SUKLAPHANTA AND ITS ACCESS ROAD</strong>",
    "MADAN BHANDARI UNIVERSITY": "<strong>MADAN BHANDARI UNIVERSITY ORTHOPHOTO</strong>",
    "Huaxin Cement Narayani Pvt. Ltd.": "January 2019<br><strong>Topographical Mapping of Huaxin Cement Narayani Pvt. Ltd. for Road and Transmission Line alignment Using UAV</strong><br>This project involved conducting Topographical Mapping of a 1232.74 Hectare stretch (12.33 sq KMs) for Huaxin Cement Narayani Pvt. Ltd. in the Dhading district of Nepal. The main objective was to use Unmanned Aerial Vehicles (UAVs) to gather highly accurate data for determining the alignment of a new road and transmission line. The survey established 17 permanent benchmarks and delivered a detailed Topographic Map with 1m contour intervals, a high-resolution Orthophoto Map, and land use details for future planning and development.",
    "Deubhumi Baluwa": "July 2020<br><strong>Topographical Survey of MBUST Site using UAV</strong><br>This project focused on conducting a Topographical Survey of the land allocated for the Madan Bhandari University of Science and Technology (MBUST) in Dewabhumi Baluwa, Panchkhal Municipality, Kavrepalanchok district, covering an area of approximately 11000 ropani. The survey was executed using Unmanned Aerial Vehicles (UAVs), establishing 16 permanent benchmarks across the hilly terrain to ensure data accuracy. The primary goal was to generate crucial planning documents, including detailed Topographic Maps with 1m contours and a high-resolution Orthophoto Map, which the MBUST Development Board will use for the preparation of the university's master plan and general development works.<br>Client: Madan Bhandari University of Science and Technology Development Board",
    "Huaxin Cement Access Road and Factory Site": "December 2023<br><strong>UAV Survey For Huaxin Cement Access Road and Factory Site</strong><br>The project focused on conducting the UAV survey and alignment decision for the Prasauni Birgunj 132 kV Underground Electricity Transmission Line Project. The initial plan was to route the approximately 2.7 km line within a narrow 2-meter buffer zone outside the 15-meter Right of Way (ROW). However, the building density assessment revealed that both the left and right sides of this buffer zone were heavily occupied (90 buildings on the left, 101 on the right), making compensation costs prohibitively high. Consequently, the project team revised the design to route the transmission line along the shoulder of the existing road. This solution minimizes compensation, utilizes public infrastructure, reduces community disruption, and ensures safer access for long-term maintenance.<br>Client: Huaxin Cement Factory",
    "Kathmandu Valley": "December 2023<br><strong>UAV Survey of Kathmandu Valley Transmission System Expansion Project</strong><br>This project involved a UAV Survey of the Kathmandu Valley Transmission System Expansion Project, conducted for the Nepal Electricity Authority (NEA) Engineering Company Ltd. The primary goal was to acquire high-accuracy geospatial data to support the expansion of the electrical grid within the Kathmandu Valley. The survey used drones to map the transmission lines and road sections, which were crucial for identifying optimal routes, evaluating environmental impact, and making informed decisions for the transmission system's design and implementation. The deliverables included Topographic Maps, Contour Maps, and a high-resolution Orthophoto Map that significantly reduced the time and cost compared to traditional surveying methods.<br>Client: NEA ENGINEERING COMPANY LTD, Thapathali, Kathmandu",
    "Veda Hospitality Site Maya Devi": "November 2024<br><strong>UAV Survey of Veda Hospitality Site Maya Devi, Lumbini</strong><br>This project conducted a Cadastral Survey and Analysis of the Veda Hospitality Site in Lumbini for the Golyan Group, aiming to accurately map and analyze land parcels to support development planning. The methodology used advanced technology, including UAVs, DGPS, and Orthomosaic imaging, to capture high-resolution data and create a cadastral overlay precisely aligned with existing records. The final output delivered detailed boundary demarcations and accurate area calculations for each parcel, providing a reliable visual tool for strategic land management and planning.<br>Client: GOLYAN GROUP, Kathmandu, Nepal",
    "Okhaldhunga": "<strong>Okhaldhunga Landslide</strong>",
    "Lamjung Manav Sewa Ashram": "<strong>Lamjung Manav Sewa Ashram</strong>",
    "DURGA BHAGWATI RURAL MUNICIPALITY, RAUTAHAT": "<strong>PREPARATION OF DETAILED ENGINEERING DESIGN OF SURFACE DRAINAGE WORK OF MAIN MARKET AREA OF DURGA BHAGWATI RURAL MUNICIPALITY, RAUTAHAT</strong><br>This project is the Detailed Engineering Design of Surface Drainage Work for the main market area of Durga Bhagwati Rural Municipality in Rautahat, Madesh Pradesh. The primary objective was to prepare a complete drainage solution and master plan, focusing on the highly waterlogged area between Pipara to Badhawa (59.40 hectares). The study utilized the Storm Water Management Model (SWMM) to analyze existing infrastructure shortcomings, conduct detailed hydrological studies for a 25-year return period, and design a proposed 8.093 km network of RCC (Reinforced Cement Concrete) drains to prevent urban flooding and ensure proper runoff management.<br>Client: Office of Rural Municipal Executive, Durga Bhagwati Rural Municipality, Ganga Pipara, Rautahat",
    "Sarangkot": "<strong>Sarangkot Housing Orthodesign Overlay</strong>",
    "KALINCHOWK": "November 2017<br><strong>KALINCHOWK HYDROPOWER PROJECT (2.6 MW)</strong><br>This project involved conducting a UAV-based Aerial Survey for the 2.6 MW Kalinchowk Hydropower Project in Dolakha District, with the objective of generating essential topographical data for project design and development. The survey used drones to capture high-resolution imagery and accurately map the project's key components, including the headworks, water conveyance system, and powerhouse area. The process established several Ground Control Points (GCPs) to ensure high data accuracy. The key deliverables provided to the client included a high-resolution Digital Terrain Model (DTM), Orthophoto Map, and a detailed Topographic Map in a shapefile format compatible with CAD software.",
    "Chulidanda": "<strong>PREPARATION OF DETAILED PROJECT REPORT (DPR) OF ZIPLINE (From Chulidanda to Palpeshwori)</strong><br>This project involved the Preparation of a Detailed Project Report (DPR) for a new adventure tourism initiative: a 851.26 meter long Zipline connecting Chulidanda to Palpeshwori in Lisankhu Pakhar Rural Municipality, Sindhupalchok. The primary goal was to enhance tourism by offering an exhilarating experience, complete with a significant 145.033 meter elevation drop. The methodology employed UAV LiDAR, Total Station, and GPS Mapping to ensure precise alignment and structural safety, ultimately concluding that the project is technically feasible, environmentally friendly, and economically viable to boost the local economy."
};

const lidarImageMapping = {
    "Melamchi": "melamchi",
    "Lalitpur": "lalitpur", 
    "Bara": "bara",
    "West Seti – Dododhara": "west_seti",
    "Tamor-Mewa HPP": "tamor_mewa",
    "Dukuchap-Sirutar-Nala Gumba-Lapsifedi": "dukuchap",
    "Kabeli Corridor": "kabeli",
    "Marin Khola": "marin",
    "Ikhuwa Khola": "ikhuwa",
    "Lekhnath-Damauli": "leknath",
    "Madhya Chameliya": "madhya_chamelia",
    "Tamor Khola": "tamor_khola",
    "Landruk Modi": "landruk_modi",
    "Pikhuwa-Tumlingtar": "pikhuwa_tumlingtar",
    "Lower Tirshuli": "lower_trishuli",
    "Lower Chameliya": "lower_chameliya",
    "Marshyangdi": "marshyangdi",
    "Chhujung Khola": "chhujung_khola"
};

const uavImageMapping = {
    "Aadhikhola": "aadhikhola",
    "Kanchanpur": "kanchanpur_road",
    "Birgunj Ortho": "birgunj_ortho",
    "Underground Transmission Line of Birgunj": "birgunj_underground",
    "Birgunj": "transmission_line_birgunj",
    "Dhaubadi": "dhaubadi_iron_ore",
    "Kapilvastu": "kapilvastu_core_area",
    "Godavari": "godavari_corridor",
    "Industrial Village – Sunwal": "industrial_village_sunwal",
    "Kapilvastu Municipality(Road Safety)": "kapilvastu_road_safety",
    "Hetauda": "hetauda_mining",
    "HONGU KHOLA": "hongu_khola_hydropower",
    "Jhapa": "jhapa_msa",
    "SUKLAPHANTA": "iswm_suklaphanta",
    "MADAN BHANDARI UNIVERSITY": "madan_bhandari_university",
    "Huaxin Cement Narayani Pvt. Ltd.": "huaxin_cement_topographical",
    "Deubhumi Baluwa": "mbust_topographical",
    "Huaxin Cement Access Road and Factory Site": "huaxin_cement_access_road",
    "Kathmandu Valley": "kathmandu_transmission",
    "Veda Hospitality Site Maya Devi": "veda_hospitality_lumbini",
    "Okhaldhunga": "okhaldhunga_landslide",
    "Lamjung Manav Sewa Ashram": "lamjung_manav_sewa",
    "DURGA BHAGWATI RURAL MUNICIPALITY, RAUTAHAT": "durga_bhagwati_drainage",
    "Sarangkot": "sarangkot_housing",
    "KALINCHOWK": "kalinchowk_hydropower",
    "Chulidanda": "chulidanda_zipline"
};

function loadSimpleLayer(url, layerGroup, color, weight) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: {
                    fillColor: color,
                    color: color,
                    weight: weight,
                    fillOpacity: 0.1
                }
            }).addTo(layerGroup);
        })
        .catch(error => console.error('Error loading layer:', error));
}

loadSimpleLayer('data/Boundary.geojson', boundaryLayer, '#ff6600', 3);
loadSimpleLayer('data/Districts.geojson', districtsLayer, '#16906cff', 1.5);
loadSimpleLayer('data/Provinces.geojson', provincesLayer, '#9966ff', 2);

function loadProjects(url, layerGroup, descriptions, imageMapping, markerType) {
    console.log(`Loading ${markerType} projects from ${url}`);
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`${markerType} data received:`, data);
            
            if (!data || !data.features || !Array.isArray(data.features)) {
                console.warn(`${markerType}: No features found`);
                return;
            }
            
            console.log(`${markerType} number of features:`, data.features.length);
            
            const geoJSONLayer = L.geoJSON(data, {
                pointToLayer: function(feature, latlng) {
                    const className = markerType === 'lidar' ? 'location-marker' : 'uav-marker';
                    const pinClass = markerType === 'lidar' ? 'location-pin' : 'uav-pin';
                    
                    const html = `
                        <div class="${pinClass}">
                            <div class="pin-icon">
                                <i class="fa-solid fa-location-dot"></i>
                            </div>
                            <div class="pin-shadow"></div>
                        </div>
                    `;
                    
                    return L.marker(latlng, {
                        icon: L.divIcon({
                            className: className,
                            html: html,
                            iconSize: [30, 42],
                            iconAnchor: [15, 42],
                            popupAnchor: [0, -36]
                        })
                    });
                },
                onEachFeature: function(feature, layer) {
                    const projectName = feature.properties.Name;
                    console.log(`Processing ${markerType} project:`, projectName);
                    
                    const description = descriptions[projectName] || "No description available";
                    let imageName = imageMapping[projectName];
                    
                    if (!imageName) {
                        imageName = projectName.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '_');
                    }
                    
                    const imagePath = `image/${imageName}.jpg`;
                    console.log(`Image for ${projectName}:`, imagePath);
                    
                    const popupHTML = `
                        <div class="project-popup">
                            <h3 class="project-title">${projectName}</h3>
                            <div class="popup-content">
                                <div class="popup-text">
                                    ${description}
                                </div>
                                <div class="popup-image">
                                    <img src="${imagePath}" alt="${projectName}" 
                                         onerror="this.onerror=null; this.src='https://via.placeholder.com/150x120/cccccc/969696?text=Image+Not+Found';">
                                </div>
                            </div>
                        </div>
                    `;
                    
                    layer.bindPopup(popupHTML);
                }
            });
            
            geoJSONLayer.addTo(layerGroup);
            console.log(`${markerType} projects added to layer group`);
            
        })
        .catch(error => {
            console.error(`Error loading ${markerType} projects:`, error);
        });
}

loadProjects('data/lidar_projects.geojson', lidarProjectsLayer, lidarDescriptions, lidarImageMapping, 'lidar');
loadProjects('data/uav_projects.geojson', uavProjectsLayer, uavDescriptions, uavImageMapping, 'uav');
lidarProjectsLayer.addTo(map);
uavProjectsLayer.addTo(map);
setTimeout(() => {
    const bounds = L.latLngBounds([]);
    
    [lidarProjectsLayer, uavProjectsLayer].forEach(layer => {
        const layerBounds = layer.getBounds();
        if (layerBounds && layerBounds.isValid()) {
            bounds.extend(layerBounds);
            console.log('Layer has bounds:', layerBounds);
        }
    });
    
    if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] });
        console.log('Map fitted to bounds:', bounds);
    } else {
        console.log('No valid bounds found, using default view');
    }
}, 3000); 

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
    const toggleBtn = document.getElementById('toggle-sidebar');
    const closeBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.add('active');
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }
    
    document.addEventListener('click', function(event) {
        if (sidebar && sidebar.classList.contains('active') && 
            !sidebar.contains(event.target) && 
            toggleBtn && !toggleBtn.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });
    
    if (sidebar) {
        sidebar.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    const basemapOptions = document.querySelectorAll('.basemap-option');
    basemapOptions.forEach(option => {
        option.addEventListener('click', function() {
            basemapOptions.forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
            const type = this.dataset.basemap;
            map.removeLayer(osm);
            map.removeLayer(googleLayer);
            map.removeLayer(satelliteLayer);
            
            if (type === 'osm') {
                osm.addTo(map);
            } else if (type === 'google') {
                googleLayer.addTo(map);
            } else if (type === 'satellite') {
                satelliteLayer.addTo(map);
            }
            if (sidebar) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    console.log('Map initialized successfully');
});
function debugFileLoading(url, fileName) {
    console.log(`Trying to load ${fileName} from: ${url}`);
    
    fetch(url)
        .then(response => {
            console.log(`${fileName} response status:`, response.status);
            console.log(`${fileName} response ok:`, response.ok);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${fileName}: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`${fileName} loaded successfully!`);
            console.log(`${fileName} data type:`, data.type);
            console.log(`${fileName} number of features:`, data.features ? data.features.length : 'No features array');
            if (data.features && data.features.length > 0) {
                console.log(`${fileName} first feature:`, data.features[0]);
                console.log(`${fileName} first feature name:`, data.features[0].properties.Name);
                console.log(`${fileName} first feature coordinates:`, data.features[0].geometry.coordinates);
            }
        })
        .catch(error => {
            console.error(`Error loading ${fileName}:`, error);
        });
}
debugFileLoading('data/lidar_projects.geojson', 'LIDAR Projects');
debugFileLoading('data/uav_projects.geojson', 'UAV Projects');



const legend = L.control({ position: 'bottomright' });
legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = '<h4>Legend</h4>' +
        '<div class="legend-item"><span class="legend-icon lidar-icon"></span> LIDAR Projects</div>' +
        '<div class="legend-item"><span class="legend-icon uav-icon"></span> UAV Projects</div>' +
        '<div class="legend-item"><span class="legend-line" style="background:#ff6600;"></span> Boundary</div>' +
        '<div class="legend-item"><span class="legend-line" style="background:#16906cff;"></span> Districts</div>' +
        '<div class="legend-item"><span class="legend-line" style="background:#9966ff;"></span> Provinces</div>';
    return div;
};

legend.addTo(map);