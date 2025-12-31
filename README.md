# FieldMap - Farm Field Mapper & Crop Rotation Planner

"Visualize your farm, plan smarter rotations"

FieldMap is a comprehensive Next.js 14 application for interactive field mapping, crop assignment, and intelligent 4-year crop rotation planning. Built for farmers and agricultural professionals to optimize their land use, improve soil health, and maximize yields through data-driven rotation planning.

## 🌟 Features

### Interactive Field Mapping (Leaflet)
- **Draw Field Boundaries**: Click and drag to create field polygons directly on the map
- **Edit Existing Fields**: Modify field boundaries by dragging vertices
- **Automatic Area Calculation**: Uses Turf.js for precise area calculations in both acres and hectares
- **Field Management**: View, search, filter, and manage all your fields
- **Visual Field Cards**: Color-coded fields with current crop assignments
- **Map Controls**: Pan, zoom, satellite/street view toggle

### 4-Year Crop Rotation Planner
- **Visual Timeline Grid**: Fields (rows) × Years (columns) for easy planning
- **Rotation Groups**: Legumes, Heavy Feeders, Light Feeders, Brassicas, Nightshades, Cucurbits, Alliums, Root Vegetables
- **Smart Validation**: Automatic warnings for poor rotation sequences
- **Intelligent Suggestions**: AI-powered crop recommendations based on rotation principles
- **Compliance Scoring**: 0-100% rotation compliance score per field

### Rotation Rules & Validation
- ❌ Never plant the same crop twice in a row
- ❌ Avoid same family consecutively (solanaceae, brassicas, etc.)
- ✓ Heavy feeders → Legumes (ideal rotation for soil restoration)
- ✓ Legumes → Heavy feeders (utilize fixed nitrogen)
- ⚠️ Heavy feeders after heavy feeders (warning only)

### Field Management
- **Field Properties**: Name, size, soil type, pH, organic matter, irrigation, drainage
- **Soil Health Tracking**: Log soil test results and amendments
- **Planting History**: Complete timeline of crops grown in each field
- **Amendment Tracking**: Record fertilizers, compost, lime applications with costs
- **Active/Inactive Status**: Archive fields not in current use

### Dashboard & Analytics
- **Quick Stats**: Total acreage, planted vs fallow, crop diversity, rotation compliance
- **Alerts System**: Rotation warnings, soil test reminders, field recommendations
- **Recent Activity**: Timeline of plantings, field creation, soil tests
- **Performance Metrics**: Rotation compliance scores, soil health trends
- **Crop Distribution**: Visual breakdown of current season plantings

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL + Auth)
- **Maps**: Leaflet, React-Leaflet, Leaflet-Draw
- **Geospatial**: Turf.js for area calculations and polygon operations
- **Dates**: date-fns for date handling
- **UI Components**: Custom components with class-variance-authority

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for database and authentication)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gianetans/field-map.git
   cd field-map
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Optional: Default map center
   NEXT_PUBLIC_DEFAULT_LAT=40.7128
   NEXT_PUBLIC_DEFAULT_LNG=-74.0060
   NEXT_PUBLIC_DEFAULT_ZOOM=13
   ```

4. **Set up Supabase database**
   
   Run the SQL schema in your Supabase SQL editor (see Database Schema section below)

5. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

6. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🗄️ Database Schema

The application uses PostgreSQL via Supabase with Row Level Security (RLS) enabled.

### Tables

#### `farms`
Multi-farm support for users managing multiple properties
- `id`, `user_id`, `name`, `address`, `latitude`, `longitude`, `total_acres`, `notes`

#### `fields`
Core field information with GeoJSON geometry storage
- `id`, `user_id`, `farm_id`, `name`, `size_acres`, `size_hectares`, `geometry` (JSONB)
- `center_lat`, `center_lng`, `soil_type`, `soil_ph`, `organic_matter_percent`
- `irrigation_type`, `drainage_quality`, `last_soil_test_date`, `notes`, `color`, `is_active`

#### `field_crops`
Current and historical crop assignments
- `id`, `user_id`, `field_id`, `crop_id`, `crop_name`, `crop_category`
- `year`, `season`, `planted_date`, `harvest_date`, `yield_amount`, `yield_unit`, `notes`

#### `rotation_plans`
Future rotation planning
- `id`, `user_id`, `field_id`, `crop_id`, `crop_name`, `crop_category`
- `year`, `season`, `is_planned`, `rotation_group`, `notes`

#### `field_amendments`
Soil improvement tracking
- `id`, `user_id`, `field_id`, `amendment_type`, `amount`, `unit`
- `application_date`, `cost`, `notes`

### Database Trigger
Automatic hectares calculation from acres:
```sql
CREATE OR REPLACE FUNCTION update_field_hectares()
RETURNS TRIGGER AS $$
BEGIN
  NEW.size_hectares = NEW.size_acres * 0.404686;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Row Level Security
All tables have RLS policies ensuring users can only access their own data:
```sql
CREATE POLICY "Users manage own fields" ON public.fields 
FOR ALL USING (auth.uid() = user_id);
```

## 📐 GeoJSON Storage

Field boundaries are stored as GeoJSON Polygons in PostgreSQL JSONB columns:

```json
{
  "type": "Polygon",
  "coordinates": [[
    [-74.0060, 40.7128],
    [-74.0050, 40.7128],
    [-74.0050, 40.7138],
    [-74.0060, 40.7138],
    [-74.0060, 40.7128]
  ]]
}
```

## 🌾 Rotation Rules Documentation

### Rotation Groups

1. **Legumes** (Nitrogen Fixers)
   - Peas, beans, clover, alfalfa
   - Fix atmospheric nitrogen, improving soil

2. **Heavy Feeders**
   - Corn, tomatoes, squash, pumpkin, cabbage
   - High nutrient requirements

3. **Light Feeders**
   - Carrots, radishes, onions, herbs
   - Lower nutrient requirements

4. **Brassicas**
   - Cabbage, broccoli, kale, cauliflower, Brussels sprouts
   - Susceptible to clubroot disease

5. **Nightshades (Solanaceae)**
   - Tomatoes, peppers, eggplant, potatoes
   - Share common diseases and pests

6. **Cucurbits**
   - Cucumbers, melons, squash, pumpkins, watermelons
   - Similar pest and disease susceptibility

7. **Alliums**
   - Onions, garlic, leeks, shallots
   - Light feeders with pest-repelling properties

8. **Root Vegetables**
   - Carrots, beets, turnips, radishes, parsnips
   - Deep soil cultivation

### Validation Rules

**Error-Level Violations:**
- Same crop twice in a row → Disease/pest buildup
- Solanaceae after solanaceae → 2-3 year break required
- Brassicas after brassicas → Clubroot accumulation

**Warning-Level Violations:**
- Heavy feeder after heavy feeder → Soil nutrient depletion
- Cucurbit after cucurbit → Disease susceptibility

### Ideal Rotation Sequences

- Heavy Feeders → Legumes → Light Feeders
- Legumes → Heavy Feeders (utilize fixed nitrogen)
- Brassicas → Legumes → Heavy Feeders (classic 3-year rotation)

## 🔧 Map Utilities (Turf.js)

### Key Functions

**`calculateAcres(geometry)`**
```typescript
const area = turf.area(geometry) // square meters
const acres = area * 0.000247105
```

**`calculateCenter(geometry)`**
```typescript
const center = turf.center(geometry)
return center.geometry.coordinates
```

**`isValidPolygon(coordinates)`**
- Checks for minimum 4 points (3 + closing)
- Validates polygon is closed
- Detects self-intersection using `turf.kinks()`

**`latLngsToGeoJSON(latLngs)`**
Converts Leaflet LatLng array to GeoJSON Polygon

**`geoJSONToLatLngs(geometry)`**
Converts GeoJSON Polygon to Leaflet LatLng array

## 📱 Pages & Routes

- `/` - Landing page with features showcase
- `/auth/login` - User authentication
- `/auth/signup` - New user registration
- `/dashboard` - Overview with stats, alerts, recent activity
- `/map` - Interactive field mapping with Leaflet
- `/fields` - List/grid view of all fields
- `/fields/[id]` - Detailed field information and history
- `/rotation` - 4-year rotation planner timeline
- `/analytics` - Charts and insights

## 🎨 Component Architecture

### UI Components (`components/ui/`)
- `button.tsx` - Variants: default, destructive, outline, ghost, link
- `input.tsx` - Text input with focus states
- `card.tsx` - Card, CardHeader, CardTitle, CardContent, CardFooter
- `badge.tsx` - Variants: default, success, warning, destructive
- `select.tsx` - Dropdown select component

### Feature Components
- `Navbar.tsx` - Navigation with active route highlighting
- `FieldCard.tsx` - Field preview card with stats (to be implemented)
- `FieldForm.tsx` - Field creation/editing form (to be implemented)
- `FieldStats.tsx` - Statistics display component (to be implemented)
- Map components (require client-side rendering):
  - `FieldMap.tsx` - Main Leaflet map
  - `FieldEditor.tsx` - Drawing/editing tools
  - `FieldPopup.tsx` - Field information popup
  - `MapLegend.tsx` - Map legend

### Rotation Components
- `RotationPlanner.tsx` - Timeline grid (to be implemented)
- `RotationTimeline.tsx` - Visual timeline (to be implemented)
- `RotationRules.tsx` - Rules display (to be implemented)
- `CropAssignment.tsx` - Crop assignment form (to be implemented)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Environment Variables
Set in Vercel dashboard or `.env.production`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Build Command
```bash
npm run build
```

### Output Directory
```
.next
```

## 🔮 Future Enhancements

### Integrations
- **CropCalendar Integration**: Pull planned crops, sync planting dates
- **FarmStock Integration**: Calculate seed needs per field, check inventory
- **FarmTasker Integration**: Create field-specific tasks with locations
- **Farm Finance Integration**: Track costs/revenue per field, profitability analysis

### Features
- Import/export field boundaries (KML, GeoJSON, Shapefile)
- Export maps to PDF
- Satellite imagery overlay
- Weather data integration
- Topography and elevation mapping
- Irrigation zone planning
- Yield heat maps
- Mobile app with GPS field boundary capture
- Soil test recommendations engine
- AI-powered crop recommendation system
- Multi-language support
- Offline mode for field work

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md for guidelines.

## 📞 Support

For issues and questions:
- GitHub Issues: [github.com/Gianetans/field-map/issues](https://github.com/Gianetans/field-map/issues)
- Documentation: See this README

## 🙏 Acknowledgments

- Leaflet for mapping capabilities
- Turf.js for geospatial calculations
- Supabase for backend infrastructure
- Next.js team for the excellent framework

---

Built with 🌱 for sustainable agriculture
