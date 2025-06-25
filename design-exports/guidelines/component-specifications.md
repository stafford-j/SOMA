# Aldr Vaults Component Specifications

## Navigation

### Navbar
- **Height**: 64px (h-16)
- **Background**: Linear gradient from Teal (#20B2AA) to Purple (#8A2BE2)
- **Logo**: Height 36px, positioned at left
- **Menu Items**: 
  - Font: Segoe UI, 16px, medium weight
  - Color: White
  - Spacing: 1.5rem between items
  - Active state: 2px white border-bottom
- **Contact Button**:
  - Padding: 0.75rem 1.75rem
  - Border-radius: 50px
  - Font: Segoe UI, 16px, semibold
  - Background: Transparent with white text on mobile, gradient on desktop
- **Mobile Menu**:
  - Collapsible hamburger menu
  - White background
  - Teal text for menu items
  - Items stacked vertically with 0.5rem spacing

## Homepage

### Header
- **Title**: "Welcome to Your Aldr Vaults"
  - Font: Segoe UI, 36px (mobile) / 48px (desktop), bold
  - Color: Gradient from Teal to Purple
- **Subtitle**: "Where all your important stuff goes"
  - Font: Segoe UI, 18px, normal
  - Color: Gray (#6C757D)
- **Spacing**: 1rem between title and subtitle

### Stats Cards
- **Layout**: 1 column (mobile) / 3 columns (desktop)
- **Dimensions**: Full width, equal height
- **Background**: Gradient from Teal to Purple
- **Text Color**: White
- **Icon**: 48px by 48px, white, centered in circle
- **Spacing**: 1.5rem between cards
- **Progress Bar**: White, variable width based on percentage

### Vaults Section
- **Title**: "Your Vaults"
  - Font: Segoe UI, 24px, bold
  - Color: Dark (#333333)
- **Cards**:
  - Layout: 1 column (mobile) / 3 columns (desktop)
  - Background: White
  - Border-radius: 0.5rem
  - Shadow: Medium (shadow-md)
  - Header: Icon (colored circle) + Name + Record count
  - Description: Gray text, 14px
  - Actions: "View Details" text link + Add button
  - Hover state: Increased shadow (shadow-lg)

### Recent Activity
- **Title**: "Recent Activity"
  - Font: Segoe UI, 24px, bold
  - Color: Dark (#333333)
- **Activity Items**:
  - Divider between items
  - Icon: Colored circle matching vault color
  - Action text: Medium weight, Dark color
  - Vault name: Gray, small text
  - Date: Right aligned, Gray
  - "Open" button: Teal background, white text, pill shape
- **View All**: Secondary button, centered below list

## Footer

### Main Footer
- **Background**: White
- **Border-top**: 1px solid #e5e7eb
- **Padding**: 1.5rem (24px)
- **Logo**: Height 80px, positioned at left
- **Navigation**:
  - Links: Privacy, Terms, Support
  - Color: Gray, Teal on hover
  - Spacing: 2rem between links
- **Layout**: Stacked on mobile, side-by-side on desktop

### Copyright Section
- **Border-top**: 1px solid #e5e7eb
- **Padding-top**: 1.5rem (24px)
- **Text**: 
  - Font: Segoe UI, 14px / 12px, normal
  - Color: Gray
  - Alignment: Center

## Responsive Behavior

### Mobile (<640px)
- Stacked layouts (single column)
- Hidden desktop navigation
- Hamburger menu for navigation
- Reduced padding and font sizes

### Tablet (640px - 1024px)
- Mixed layouts (1-2 columns depending on content)
- Visible desktop navigation
- Adjusted card sizes for optimal viewing

### Desktop (>1024px)
- Multi-column layouts (3 columns for cards)
- Full desktop navigation
- Optimized spacing for larger screens

## Animation and Interaction

### Hover States
- **Buttons**: Color shift from Teal to Purple
- **Cards**: Increased shadow
- **Links**: Color change from Gray to Teal

### Transitions
- **Duration**: 300ms
- **Properties**: color, background-color, shadow
- **Timing**: ease-in-out