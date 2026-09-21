import type { Section } from '@/types'

export const AER316_SECTIONS: Section[] = [
  {
    id: 'aer316-sec-fluid-properties',
    label: 'Fluid Properties & Fundamentals (Ch. 1-3)',
    cat: 'properties',
    order: 0,
    cards: [
      {
        id: 'aer316-card-density-sg',
        order: 0,
        tag: 'Properties',
        tagBg: '#E0F2FE',
        tagColor: '#0369A1',
        title: 'Density, specific weight, specific gravity',
        subs: [
          { latex: '\\rho = \\dfrac{m}{V}' },
          { latex: '\\gamma = \\rho g' },
          { latex: 'SG = \\dfrac{\\rho}{\\rho_{\\text{water}}}' },
        ],
        notes:
          '<strong>ρ</strong> = density (kg/m³), <strong>γ</strong> = specific weight (N/m³), <strong>SG</strong> is dimensionless (ρ_water at 4°C = 1000 kg/m³).',
      },
      {
        id: 'aer316-card-viscosity',
        order: 1,
        tag: 'Viscosity',
        tagBg: '#FFEDD5',
        tagColor: '#7C2D12',
        title: 'Newton\'s law of viscosity',
        subs: [
          { latex: '\\tau = \\mu \\dfrac{du}{dy}' },
          { latex: '\\nu = \\dfrac{\\mu}{\\rho}' },
        ],
        notes:
          '<strong>τ</strong> = shear stress, <strong>μ</strong> = dynamic viscosity (Pa·s), <strong>ν</strong> = kinematic viscosity (m²/s). Holds for Newtonian fluids only; μ decreases with temperature for liquids, increases for gases.',
      },
      {
        id: 'aer316-card-surface-tension',
        order: 2,
        tag: 'Surface Tension',
        tagBg: '#DCFCE7',
        tagColor: '#166534',
        title: 'Surface tension & capillary rise',
        subs: [
          { latex: 'h = \\dfrac{4\\sigma\\cos\\theta}{\\gamma d}' },
          { latex: '\\Delta p = \\dfrac{2\\sigma}{R} \\quad \\text{(droplet/bubble surface)}' },
          { latex: '\\Delta p = \\dfrac{4\\sigma}{R} \\quad \\text{(soap bubble, two surfaces)}' },
        ],
        notes:
          '<strong>σ</strong> = surface tension (N/m), <strong>θ</strong> = contact angle, <strong>d</strong> = tube diameter. Wetting liquids (θ &lt; 90°) rise in a capillary; non-wetting liquids (e.g. mercury) are depressed.',
      },
      {
        id: 'aer316-card-vapor-pressure-cavitation',
        order: 3,
        tag: 'Vapor Pressure',
        tagBg: '#FEF3C7',
        tagColor: '#92400E',
        title: 'Vapor pressure & cavitation number',
        formula: '\\sigma_v = \\dfrac{p - p_v}{\\tfrac{1}{2}\\rho V^2}',
        formulaDisplay: true,
        notes:
          '<strong>p_v</strong> = vapor pressure of the liquid at the local temperature. Cavitation begins when local pressure drops to p_v, forming vapor bubbles that collapse (and can damage surfaces) further downstream.',
      },
      {
        id: 'aer316-card-bulk-modulus',
        order: 4,
        tag: 'Compressibility',
        tagBg: '#EDE9FE',
        tagColor: '#6D28D9',
        title: 'Bulk modulus of elasticity',
        formula: 'E_v = -V\\dfrac{dp}{dV} = \\rho\\dfrac{dp}{d\\rho}',
        formulaDisplay: true,
        notes:
          '<strong>E_v</strong> = bulk modulus (Pa); large E_v ⇒ nearly incompressible liquid. Speed of sound c = √(E_v/ρ); water is treated as incompressible throughout this course.',
      },
      {
        id: 'aer316-card-dimensionless-groups-ref',
        order: 5,
        tag: 'Dimensionless Groups',
        tagBg: '#DBEAFE',
        tagColor: '#1D4ED8',
        title: 'Common dimensionless numbers (quick reference)',
        tableRows: [
          { symbol: 'Re', value: 'ρVL/μ', quantity: 'Reynolds number — inertia / viscous forces' },
          { symbol: 'Fr', value: 'V/√(gL)', quantity: 'Froude number — inertia / gravity forces' },
          { symbol: 'We', value: 'ρV²L/σ', quantity: 'Weber number — inertia / surface tension' },
          { symbol: 'Ma', value: 'V/c', quantity: 'Mach number — velocity / speed of sound' },
          { symbol: 'Eu', value: 'Δp/(ρV²)', quantity: 'Euler number — pressure / inertia forces' },
          { symbol: 'Re_cr (pipe)', value: '≈ 2300', quantity: 'Laminar → transitional pipe flow' },
          { symbol: 'Re_x,cr (flat plate)', value: '≈ 5×10⁵', quantity: 'Laminar → turbulent boundary layer' },
        ],
      },
      {
        id: 'aer316-card-fluid-properties-table',
        order: 6,
        tag: 'Properties',
        tagBg: '#E0F2FE',
        tagColor: '#0369A1',
        title: 'Standard fluid properties (water & air)',
        tableRows: [
          { symbol: 'ρ_water', value: '1000 kg/m³', quantity: 'Density of water at 4°C' },
          { symbol: 'μ_water', value: '1.12×10⁻³ Pa·s', quantity: 'Dynamic viscosity of water at ~15-20°C' },
          { symbol: 'ρ_air', value: '1.225 kg/m³', quantity: 'Density of air at 15°C, 101.3 kPa' },
          { symbol: 'μ_air', value: '1.79×10⁻⁵ Pa·s', quantity: 'Dynamic viscosity of air at 15°C' },
          { symbol: 'g', value: '9.81 m/s²', quantity: 'Standard gravitational acceleration' },
          { symbol: 'p_atm', value: '101.3 kPa', quantity: 'Standard atmospheric pressure' },
        ],
      },
    ],
  },
  {
    id: 'aer316-sec-fluid-statics',
    label: 'Fluid Statics (Ch. 2)',
    cat: 'statics',
    order: 1,
    cards: [
      {
        id: 'aer316-card-hydrostatic-pressure',
        order: 0,
        tag: 'Hydrostatics',
        tagBg: '#CCFBF1',
        tagColor: '#0F766E',
        title: 'Pressure variation with elevation',
        subs: [
          { latex: '\\dfrac{dp}{dz} = -\\gamma' },
          { latex: 'p = p_0 + \\gamma h' },
        ],
        notes:
          '<strong>z</strong> measured upward, <strong>h</strong> = depth below the free surface. Valid for a static, incompressible fluid — pressure depends only on depth, not on container shape.',
      },
      {
        id: 'aer316-card-manometry',
        order: 1,
        tag: 'Manometry',
        tagBg: '#99F6E4',
        tagColor: '#115E59',
        title: 'Manometer equation',
        formula: 'p_1 + \\sum \\gamma_i h_{\\text{down},i} - \\sum \\gamma_i h_{\\text{up},i} = p_2',
        formulaDisplay: true,
        notes:
          'Starting from a known pressure, add γh for every descent and subtract γh for every rise as you trace through the manometer fluid(s) to the other point.',
      },
      {
        id: 'aer316-card-abs-gauge-pressure',
        order: 2,
        tag: 'Pressure',
        tagBg: '#CCFBF1',
        tagColor: '#134E4A',
        title: 'Absolute vs. gauge pressure',
        formula: 'p_{\\text{abs}} = p_{\\text{gauge}} + p_{\\text{atm}}',
        formulaDisplay: true,
        notes:
          'Absolute pressure is referenced to a perfect vacuum; gauge pressure is referenced to local atmospheric pressure. Most pressure gauges read gauge pressure.',
      },
      {
        id: 'aer316-card-plane-surface-force',
        order: 3,
        tag: 'Plane Surface',
        tagBg: '#D1FAE5',
        tagColor: '#047857',
        title: 'Hydrostatic force on a submerged plane surface',
        subs: [
          { latex: 'F_R = \\gamma h_c A' },
          { latex: 'y_{cp} = y_c + \\dfrac{I_{xc}}{y_c A}' },
        ],
        notes:
          '<strong>h_c</strong> = depth of the area centroid, <strong>A</strong> = surface area, <strong>y_c</strong>/<strong>y_cp</strong> = centroid / center-of-pressure locations measured along the inclined surface, <strong>I_xc</strong> = centroidal second moment of area.',
      },
      {
        id: 'aer316-card-curved-surface-force',
        order: 4,
        tag: 'Curved Surface',
        tagBg: '#D1FAE5',
        tagColor: '#059669',
        title: 'Hydrostatic force on a curved submerged surface',
        subs: [
          { latex: 'F_H = \\text{force on the vertical projection of the surface}' },
          { latex: 'F_V = \\gamma V_{\\text{above surface}} \\quad \\text{(real or virtual fluid weight)}' },
          { latex: 'F_R = \\sqrt{F_H^2 + F_V^2}' },
        ],
        notes:
          'F_H acts through the centroid of the vertical projected area; F_V acts through the centroid of the (real or virtual) fluid volume above the surface up to the free surface.',
      },
      {
        id: 'aer316-card-buoyancy',
        order: 5,
        tag: 'Buoyancy',
        tagBg: '#CCFBF1',
        tagColor: '#0D9488',
        title: 'Buoyancy — Archimedes\' principle',
        formula: 'F_B = \\gamma_{\\text{fluid}} V_{\\text{displaced}}',
        formulaDisplay: true,
        notes:
          'F_B acts upward through the centroid of the displaced volume (center of buoyancy). A floating body is stable if the metacenter lies above its center of gravity.',
      },
      {
        id: 'aer316-card-rigid-body-accel-rotation',
        order: 6,
        tag: 'Accelerating Fluids',
        tagBg: '#CCFBF1',
        tagColor: '#14B8A6',
        title: 'Pressure in accelerating / rotating fluids',
        subs: [
          { latex: '\\dfrac{\\partial p}{\\partial x} = -\\rho a_x, \\quad \\dfrac{\\partial p}{\\partial z} = -\\rho (g + a_z)' },
          { latex: '\\dfrac{\\partial p}{\\partial r} = \\rho r \\omega^2 \\quad \\text{(rigid-body rotation)}' },
          { latex: 'z_{\\text{surface}} = \\dfrac{\\omega^2 r^2}{2g} + \\text{const.}' },
        ],
        notes:
          'For linear acceleration, surfaces of constant pressure are perpendicular to the effective gravity vector (g − a). Rigid-body rotation about a vertical axis produces a paraboloid free surface.',
      },
    ],
  },
  {
    id: 'aer316-sec-bernoulli',
    label: 'The Bernoulli Equation & Pressure Variation (Ch. 4)',
    cat: 'bernoulli',
    order: 2,
    cards: [
      {
        id: 'aer316-card-fluid-acceleration',
        order: 0,
        tag: 'Acceleration',
        tagBg: '#FEF3C7',
        tagColor: '#92400E',
        title: 'Fluid acceleration (material derivative)',
        subs: [
          { latex: '\\vec{a} = \\dfrac{\\partial \\vec{V}}{\\partial t} + (\\vec{V}\\cdot\\nabla)\\vec{V}' },
          { latex: 'a_s = \\dfrac{\\partial V}{\\partial t} + V\\dfrac{\\partial V}{\\partial s} \\quad \\text{(along a streamline)}' },
        ],
        notes:
          'The material (substantial) derivative sums local (unsteady) and convective acceleration. For steady flow the first term vanishes.',
      },
      {
        id: 'aer316-card-euler-equation',
        order: 1,
        tag: 'Euler',
        tagBg: '#FEF3C7',
        tagColor: '#B45309',
        title: 'Euler\'s equation of motion',
        formula: '-\\dfrac{\\partial p}{\\partial s} - \\gamma\\dfrac{\\partial z}{\\partial s} = \\rho a_s',
        formulaDisplay: true,
        notes:
          'Inviscid form of Newton\'s 2nd law along streamline coordinate s. Integrating along s for steady, incompressible flow yields the Bernoulli equation.',
      },
      {
        id: 'aer316-card-curved-streamline-pressure',
        order: 2,
        tag: 'Euler',
        tagBg: '#FEF3C7',
        tagColor: '#B45309',
        title: 'Pressure variation across curved streamlines',
        formula: '-\\dfrac{\\partial p}{\\partial n} - \\gamma\\dfrac{\\partial z}{\\partial n} = \\dfrac{\\rho V^2}{R}',
        formulaDisplay: true,
        notes:
          '<strong>R</strong> = local radius of curvature, <strong>n</strong> points toward the center of curvature. Explains pressure rise toward the outside of a bend or vortex core suction.',
      },
      {
        id: 'aer316-card-bernoulli-equation',
        order: 3,
        tag: 'Bernoulli',
        tagBg: '#FFEDD5',
        tagColor: '#C2410C',
        title: 'Bernoulli equation',
        formula: '\\dfrac{p_1}{\\gamma} + \\dfrac{V_1^2}{2g} + z_1 = \\dfrac{p_2}{\\gamma} + \\dfrac{V_2^2}{2g} + z_2',
        formulaDisplay: true,
        notes:
          'Valid along a streamline for steady, incompressible, inviscid flow with no shaft work or heat transfer between points 1 and 2.',
      },
      {
        id: 'aer316-card-stagnation-pitot',
        order: 4,
        tag: 'Stagnation',
        tagBg: '#FFEDD5',
        tagColor: '#9A3412',
        title: 'Stagnation pressure & Pitot-static tube',
        subs: [
          { latex: 'p_0 = p + \\tfrac{1}{2}\\rho V^2' },
          { latex: 'V = \\sqrt{\\dfrac{2(p_0 - p)}{\\rho}}' },
        ],
        notes:
          '<strong>p_0</strong> = stagnation (total) pressure where the flow is brought to rest. A Pitot-static tube measures p_0 − p to give local velocity.',
      },
      {
        id: 'aer316-card-bernoulli-assumptions',
        order: 5,
        tag: 'Bernoulli',
        tagBg: '#FFEDD5',
        tagColor: '#C2410C',
        title: 'When Bernoulli applies',
        notes:
          'Requires steady, incompressible, inviscid (frictionless) flow along a streamline with no pump/turbine between the two points — otherwise use the full energy equation (Ch. 7) with h_L, h_p, h_t.',
      },
    ],
  },
  {
    id: 'aer316-sec-continuity',
    label: 'Control Volume Approach & Continuity (Ch. 5)',
    cat: 'continuity',
    order: 3,
    cards: [
      {
        id: 'aer316-card-rtt',
        order: 0,
        tag: 'RTT',
        tagBg: '#EDE9FE',
        tagColor: '#6D28D9',
        title: 'Reynolds Transport Theorem',
        formula:
          '\\dfrac{dB_{sys}}{dt} = \\dfrac{\\partial}{\\partial t}\\iiint_{cv} \\rho b \\, dV + \\iint_{cs} \\rho b (\\vec{V}\\cdot\\hat{n})\\, dA',
        formulaDisplay: true,
        notes:
          '<strong>B</strong> = any extensive system property, <strong>b</strong> = B per unit mass. Setting B = mass, momentum, or energy generates the continuity, momentum, and energy equations respectively.',
      },
      {
        id: 'aer316-card-continuity-integral',
        order: 1,
        tag: 'Continuity',
        tagBg: '#F3E8FF',
        tagColor: '#7E22CE',
        title: 'Continuity equation — integral form',
        subs: [
          { latex: '\\dfrac{\\partial}{\\partial t}\\iiint_{cv} \\rho\\, dV + \\iint_{cs} \\rho (\\vec{V}\\cdot\\hat{n})\\, dA = 0' },
          { latex: '\\sum \\dot m_{in} = \\sum \\dot m_{out} \\quad \\text{(steady flow)}' },
        ],
        notes:
          'From RTT with B = mass, b = 1. For steady, incompressible flow through a single inlet/outlet: A_1V_1 = A_2V_2.',
      },
      {
        id: 'aer316-card-continuity-differential',
        order: 2,
        tag: 'Continuity',
        tagBg: '#F3E8FF',
        tagColor: '#7E22CE',
        title: 'Continuity equation — differential form',
        formula: '\\dfrac{\\partial \\rho}{\\partial t} + \\nabla\\cdot(\\rho \\vec{V}) = 0',
        formulaDisplay: true,
        notes: 'Reduces to <strong>∇·V = 0</strong> for incompressible flow (ρ = constant).',
      },
      {
        id: 'aer316-card-avg-velocity-flowrate',
        order: 3,
        tag: 'Flow Rate',
        tagBg: '#EDE9FE',
        tagColor: '#8B5CF6',
        title: 'Average velocity, volumetric & mass flow rate',
        subs: [
          { latex: '\\dot V = \\int_A V\\, dA = V_{avg} A' },
          { latex: '\\dot m = \\rho \\dot V' },
        ],
        notes:
          '<strong>V_avg</strong> = bulk mean velocity over the cross-section; <strong>V̇</strong> (often written Q) is the volumetric flow rate.',
      },
      {
        id: 'aer316-card-continuity-multiport',
        order: 4,
        tag: 'Continuity',
        tagBg: '#F3E8FF',
        tagColor: '#7E22CE',
        title: 'Continuity at junctions / multi-port control volumes',
        formula: '\\sum (\\rho A V)_{in} = \\sum (\\rho A V)_{out}',
        formulaDisplay: true,
        notes: 'Apply at tees, junctions, and branching pipe networks; simplifies to ΣQ_in = ΣQ_out for incompressible flow.',
      },
    ],
  },
  {
    id: 'aer316-sec-momentum',
    label: 'The Momentum Equation (Ch. 6)',
    cat: 'momentum',
    order: 4,
    cards: [
      {
        id: 'aer316-card-momentum-equation',
        order: 0,
        tag: 'Momentum',
        tagBg: '#FFE4E6',
        tagColor: '#9F1239',
        title: 'Linear momentum equation for a control volume',
        subs: [
          {
            latex:
              '\\sum \\vec F = \\dfrac{\\partial}{\\partial t}\\iiint_{cv} \\rho \\vec V\\, dV + \\iint_{cs} \\rho \\vec V (\\vec V\\cdot\\hat n)\\, dA',
          },
          { latex: '\\sum \\vec F = \\sum \\dot m_{out}\\vec V_{out} - \\sum \\dot m_{in}\\vec V_{in} \\quad \\text{(steady)}' },
        ],
        notes:
          '<strong>ΣF</strong> includes pressure forces, gravity, and support/reaction forces on the control volume. From RTT with B = mV, b = V.',
      },
      {
        id: 'aer316-card-bend-nozzle-force',
        order: 1,
        tag: 'Bends/Nozzles',
        tagBg: '#FFE4E6',
        tagColor: '#BE123C',
        title: 'Force on a pipe bend, reducer, or nozzle',
        formula: 'F_x + p_1A_1 - p_2A_2\\cos\\theta = \\dot m(V_2\\cos\\theta - V_1)',
        formulaDisplay: true,
        notes:
          'Apply the momentum equation componentwise; include gauge-pressure forces on the open control-surface faces and solve for the anchoring/support force F_x, F_y.',
      },
      {
        id: 'aer316-card-vane-force',
        order: 2,
        tag: 'Vanes',
        tagBg: '#FFE4E6',
        tagColor: '#E11D48',
        title: 'Force on a stationary vane / blade',
        subs: [
          { latex: 'F_x = \\dot m (V_2\\cos\\theta - V_1)' },
          { latex: 'F_y = \\dot m V_2\\sin\\theta' },
        ],
        notes:
          '<strong>θ</strong> = jet deflection angle. For a moving vane, replace V with the velocity relative to the vane and use the relative mass flow rate.',
      },
      {
        id: 'aer316-card-navier-stokes',
        order: 3,
        tag: 'Navier-Stokes',
        tagBg: '#FFE4E6',
        tagColor: '#881337',
        title: 'Navier-Stokes equations (incompressible, Newtonian)',
        formula:
          '\\rho\\left(\\dfrac{\\partial \\vec V}{\\partial t} + (\\vec V\\cdot\\nabla)\\vec V\\right) = -\\nabla p + \\rho \\vec g + \\mu \\nabla^2 \\vec V',
        formulaDisplay: true,
        notes:
          'Differential momentum equation. Terms (L→R): unsteady + convective inertia, pressure force, gravity, viscous force. Reduces to Euler\'s equation when μ = 0.',
      },
      {
        id: 'aer316-card-angular-momentum',
        order: 4,
        tag: 'Angular Momentum',
        tagBg: '#FCE7F3',
        tagColor: '#9D174D',
        title: 'Angular momentum equation',
        subs: [
          {
            latex:
              '\\sum \\vec T = \\dfrac{\\partial}{\\partial t}\\iiint_{cv}(\\vec r\\times \\vec V)\\rho\\, dV + \\iint_{cs}(\\vec r\\times\\vec V)\\rho(\\vec V\\cdot\\hat n)\\, dA',
          },
          { latex: 'T = \\dot m (r_2 V_{t2} - r_1 V_{t1}) \\quad \\text{(steady, e.g. turbomachine)}' },
        ],
        notes:
          'Basis of the Euler turbomachine equation, relating shaft torque to the change in tangential momentum flux (r·V_t) through a rotor or pump impeller.',
      },
    ],
  },
  {
    id: 'aer316-sec-energy',
    label: 'The Energy Equation (Ch. 7)',
    cat: 'energy',
    order: 5,
    cards: [
      {
        id: 'aer316-card-energy-equation',
        order: 0,
        tag: 'Energy Eq',
        tagBg: '#E0E7FF',
        tagColor: '#3730A3',
        title: 'Energy equation with pump/turbine head & losses',
        formula:
          '\\dfrac{p_1}{\\gamma} + \\dfrac{V_1^2}{2g} + z_1 + h_p = \\dfrac{p_2}{\\gamma} + \\dfrac{V_2^2}{2g} + z_2 + h_t + h_L',
        formulaDisplay: true,
        notes:
          '<strong>h_p</strong> = head added by a pump, <strong>h_t</strong> = head extracted by a turbine, <strong>h_L</strong> = total head loss between sections 1 and 2 (Crowe/Elger convention).',
      },
      {
        id: 'aer316-card-pump-turbine-power',
        order: 1,
        tag: 'Power',
        tagBg: '#E0E7FF',
        tagColor: '#4338CA',
        title: 'Pump and turbine power',
        subs: [
          { latex: 'P_{p,\\text{fluid}} = \\gamma \\dot V h_p, \\quad P_{p,\\text{input}} = \\dfrac{\\gamma \\dot V h_p}{\\eta_p}' },
          { latex: 'P_{t,\\text{fluid}} = \\gamma \\dot V h_t, \\quad P_{t,\\text{output}} = \\eta_t\\, \\gamma \\dot V h_t' },
        ],
        notes:
          '<strong>η_p</strong>, <strong>η_t</strong> = pump/turbine efficiencies (&lt; 1). Power in watts when γ [N/m³], V̇ [m³/s], h [m].',
      },
      {
        id: 'aer316-card-bernoulli-vs-energy',
        order: 2,
        tag: 'Comparison',
        tagBg: '#E0E7FF',
        tagColor: '#4F46E5',
        title: 'Bernoulli vs. the energy equation',
        notes:
          'Bernoulli is the energy equation with h_p = h_t = h_L = 0 (frictionless, no machines). Use the full energy equation whenever friction, a pump, or a turbine acts between the two sections.',
      },
      {
        id: 'aer316-card-hgl-egl',
        order: 3,
        tag: 'HGL/EGL',
        tagBg: '#E0E7FF',
        tagColor: '#4F46E5',
        title: 'Hydraulic grade line & energy grade line',
        subs: [
          { latex: '\\text{HGL} = \\dfrac{p}{\\gamma} + z' },
          { latex: '\\text{EGL} = \\text{HGL} + \\dfrac{V^2}{2g}' },
        ],
        notes:
          'EGL always slopes downward in the flow direction (drops by h_L, jumps up at a pump by h_p, drops at a turbine by h_t); HGL sits one velocity head below the EGL.',
      },
      {
        id: 'aer316-card-ke-correction-factor',
        order: 4,
        tag: 'KE Correction',
        tagBg: '#EEF2FF',
        tagColor: '#6366F1',
        title: 'Kinetic energy correction factor',
        formula: '\\alpha = \\dfrac{\\int_A V^3\\, dA}{V_{avg}^3 A}',
        formulaDisplay: true,
        notes:
          'Accounts for non-uniform velocity profiles in the energy equation (use α·V²/2g). <strong>α ≈ 2.0</strong> for laminar pipe flow, <strong>α ≈ 1.05</strong> (often taken as 1) for turbulent flow.',
      },
    ],
  },
  {
    id: 'aer316-sec-dimensional-analysis',
    label: 'Dimensional Analysis & Similitude (Ch. 8)',
    cat: 'dimensional-analysis',
    order: 6,
    cards: [
      {
        id: 'aer316-card-buckingham-pi',
        order: 0,
        tag: 'Buckingham Pi',
        tagBg: '#CFFAFE',
        tagColor: '#0E7490',
        title: 'Buckingham Pi theorem',
        formula: 'n_{\\pi} = n - m',
        formulaDisplay: true,
        notes:
          '<strong>n</strong> = number of physical variables, <strong>m</strong> = number of primary dimensions involved (rank of the dimensional matrix, typically M, L, T). The problem reduces to n_π independent dimensionless π groups.',
      },
      {
        id: 'aer316-card-pi-method',
        order: 1,
        tag: 'Pi Method',
        tagBg: '#CFFAFE',
        tagColor: '#0891B2',
        title: 'Method of repeating variables',
        notes:
          '1) List all variables & their dimensions. 2) Choose m repeating variables spanning all primary dimensions (not themselves dimensionless). 3) Combine each remaining variable with the repeating set to form a π group. 4) Check that each π is dimensionless.',
      },
      {
        id: 'aer316-card-dimensionless-groups-table',
        order: 2,
        tag: 'Dimensionless Groups',
        tagBg: '#E0F2FE',
        tagColor: '#0369A1',
        title: 'Common dimensionless groups',
        tableRows: [
          { symbol: 'Re', value: 'ρVL/μ', quantity: 'Reynolds number — inertia / viscous forces' },
          { symbol: 'Fr', value: 'V/√(gL)', quantity: 'Froude number — inertia / gravity forces' },
          { symbol: 'We', value: 'ρV²L/σ', quantity: 'Weber number — inertia / surface tension' },
          { symbol: 'Ma', value: 'V/c', quantity: 'Mach number — compressibility effects' },
          { symbol: 'Eu', value: 'Δp/(ρV²)', quantity: 'Euler number — pressure / inertia forces' },
          { symbol: 'St', value: 'fL/V', quantity: 'Strouhal number — unsteadiness (e.g. vortex shedding)' },
          { symbol: 'C_p', value: '(p−p∞)/(½ρV²)', quantity: 'Pressure coefficient' },
          { symbol: 'C_D', value: 'F_D/(½ρV²A)', quantity: 'Drag coefficient' },
        ],
      },
      {
        id: 'aer316-card-similarity-types',
        order: 3,
        tag: 'Similarity',
        tagBg: '#CFFAFE',
        tagColor: '#155E75',
        title: 'Geometric, kinematic & dynamic similarity',
        notes:
          '<strong>Geometric</strong>: all length ratios equal (model is a scaled copy). <strong>Kinematic</strong>: velocity/acceleration fields are scaled versions (matching streamline patterns). <strong>Dynamic</strong>: all relevant force ratios (π groups) match between model and prototype.',
      },
      {
        id: 'aer316-card-model-scaling-laws',
        order: 4,
        tag: 'Model Scaling',
        tagBg: '#ECFEFF',
        tagColor: '#164E63',
        title: 'Model-prototype scaling laws',
        subs: [
          { latex: '\\left(\\dfrac{VL}{\\nu}\\right)_m = \\left(\\dfrac{VL}{\\nu}\\right)_p \\quad \\text{(Reynolds scaling)}' },
          { latex: '\\left(\\dfrac{V}{\\sqrt{gL}}\\right)_m = \\left(\\dfrac{V}{\\sqrt{gL}}\\right)_p \\quad \\text{(Froude scaling)}' },
          { latex: '\\dfrac{F_m}{F_p} = \\dfrac{\\rho_m}{\\rho_p}\\left(\\dfrac{V_m}{V_p}\\right)^2\\left(\\dfrac{L_m}{L_p}\\right)^2' },
        ],
        notes:
          'Matching every π group at once is usually impossible (Re and Fr scaling conflict) — match whichever dominates the physics: Fr for free-surface/ship models, Re for fully-submerged internal or external flows.',
      },
      {
        id: 'aer316-card-drag-lift-coefficients',
        order: 5,
        tag: 'Force Coefficients',
        tagBg: '#CFFAFE',
        tagColor: '#0E7490',
        title: 'Drag & lift coefficients',
        subs: [
          { latex: 'C_D = \\dfrac{F_D}{\\tfrac{1}{2}\\rho V^2 A}' },
          { latex: 'C_L = \\dfrac{F_L}{\\tfrac{1}{2}\\rho V^2 A}' },
        ],
        notes:
          '<strong>A</strong> is the frontal (projected) area for drag and the planform area for lift. Both coefficients are functions of Re and geometry — read from experimental charts.',
      },
    ],
  },
  {
    id: 'aer316-sec-boundary-layer',
    label: 'Surface Resistance — Boundary Layers (Ch. 9)',
    cat: 'boundary-layer',
    order: 7,
    cards: [
      {
        id: 'aer316-card-bl-thickness-defs',
        order: 0,
        tag: 'BL Thickness',
        tagBg: '#FAE8FF',
        tagColor: '#A21CAF',
        title: 'Boundary layer thickness definitions',
        subs: [
          { latex: '\\delta: \\quad u(\\delta) = 0.99\\,U \\quad \\text{(99% thickness)}' },
          { latex: '\\delta^{*} = \\int_0^{\\infty}\\left(1-\\dfrac{u}{U}\\right) dy \\quad \\text{(displacement thickness)}' },
          { latex: '\\theta = \\int_0^{\\infty} \\dfrac{u}{U}\\left(1-\\dfrac{u}{U}\\right) dy \\quad \\text{(momentum thickness)}' },
        ],
        notes:
          '<strong>U</strong> = free-stream velocity. δ* is the mass-flow deficit thickness; θ is the momentum-flux deficit thickness — both used in integral boundary-layer analysis.',
      },
      {
        id: 'aer316-card-blasius-solution',
        order: 1,
        tag: 'Blasius',
        tagBg: '#FAE8FF',
        tagColor: '#86198F',
        title: 'Laminar flat-plate boundary layer — Blasius solution',
        subs: [
          { latex: '\\dfrac{\\delta}{x} = \\dfrac{5.0}{\\sqrt{Re_x}}' },
          { latex: '\\dfrac{\\delta^{*}}{x} = \\dfrac{1.721}{\\sqrt{Re_x}}, \\quad \\dfrac{\\theta}{x} = \\dfrac{0.664}{\\sqrt{Re_x}}' },
          { latex: 'C_{f,x} = \\dfrac{\\tau_w}{\\tfrac{1}{2}\\rho U^2} = \\dfrac{0.664}{\\sqrt{Re_x}}' },
        ],
        notes:
          'Exact similarity solution of the laminar boundary-layer equations for a flat plate at zero pressure gradient; Re_x = Ux/ν.',
      },
      {
        id: 'aer316-card-avg-skin-friction-laminar',
        order: 2,
        tag: 'Skin Friction',
        tagBg: '#F3E8FF',
        tagColor: '#701A75',
        title: 'Average skin friction coefficient — laminar',
        formula: 'C_{f,avg} = \\dfrac{1.328}{\\sqrt{Re_L}}',
        formulaDisplay: true,
        notes: 'Average over a plate of length L. Total friction drag: F_D = C_f,avg · (½ρU²) · A.',
      },
      {
        id: 'aer316-card-turbulent-bl-approx',
        order: 3,
        tag: 'Turbulent BL',
        tagBg: '#FAE8FF',
        tagColor: '#C026D3',
        title: 'Turbulent boundary layer (flat plate, empirical)',
        subs: [
          { latex: '\\dfrac{\\delta}{x} \\approx \\dfrac{0.37}{Re_x^{0.2}}' },
          { latex: 'C_{f,x} \\approx \\dfrac{0.0592}{Re_x^{0.2}}' },
          { latex: 'C_{f,avg} \\approx \\dfrac{0.074}{Re_L^{0.2}} \\quad (Re_L < 10^7)' },
        ],
        notes:
          'Empirical power-law fits assuming a turbulent layer from the leading edge; roughly valid for 5×10⁵ &lt; Re_x &lt; 10⁷.',
      },
      {
        id: 'aer316-card-transition-flat-plate',
        order: 4,
        tag: 'Transition',
        tagBg: '#FCE7F3',
        tagColor: '#D946EF',
        title: 'Transition Reynolds number',
        notes:
          'Boundary layer transition from laminar to turbulent typically begins near Re_x,cr ≈ 5×10⁵ for a smooth flat plate at low free-stream turbulence — a different length scale than the pipe-flow Re_cr ≈ 2300, so the two are not directly comparable.',
      },
      {
        id: 'aer316-card-pressure-gradient-separation',
        order: 5,
        tag: 'Separation',
        tagBg: '#FAE8FF',
        tagColor: '#A21CAF',
        title: 'Pressure gradient effects & separation',
        notes:
          'Favorable gradient (dp/dx &lt; 0, accelerating flow) thins the boundary layer and delays separation. Adverse gradient (dp/dx &gt; 0, decelerating flow) thickens it and can cause separation, where wall shear stress τ_w → 0 and flow reverses near the wall.',
      },
      {
        id: 'aer316-card-skin-friction-drag',
        order: 6,
        tag: 'Drag',
        tagBg: '#FAE8FF',
        tagColor: '#86198F',
        title: 'Skin-friction drag force',
        formula: 'F_D = C_{f,avg}\\left(\\tfrac{1}{2}\\rho U^2\\right) A',
        formulaDisplay: true,
        notes:
          'Total friction (surface-resistance) drag on a plate of wetted area A. For a bluff body, add form/pressure drag separately — this captures skin friction only.',
      },
    ],
  },
  {
    id: 'aer316-sec-pipe-flow',
    label: 'Flow in Conduits — Pipe Flow & Losses (Ch. 10)',
    cat: 'pipe-flow',
    order: 8,
    cards: [
      {
        id: 'aer316-card-re-pipe-transition',
        order: 0,
        tag: 'Re & Transition',
        tagBg: '#DBEAFE',
        tagColor: '#1E3A8A',
        title: 'Reynolds number for pipe flow & transition',
        formula: 'Re = \\dfrac{\\rho V D}{\\mu} = \\dfrac{VD}{\\nu}',
        formulaDisplay: true,
        notes:
          'Based on mean velocity V and pipe diameter D. Laminar: Re &lt; 2300; transitional: 2300-4000; turbulent: Re &gt; 4000 (approximate, smooth pipes).',
      },
      {
        id: 'aer316-card-hagen-poiseuille',
        order: 1,
        tag: 'Laminar Flow',
        tagBg: '#DBEAFE',
        tagColor: '#1E40AF',
        title: 'Laminar pipe flow — Hagen-Poiseuille',
        subs: [
          { latex: '\\dot V = \\dfrac{\\pi \\Delta p\\, D^4}{128\\, \\mu L}' },
          { latex: 'V_{avg} = \\dfrac{\\Delta p\\, D^2}{32\\, \\mu L}' },
          { latex: 'f = \\dfrac{64}{Re}' },
        ],
        notes:
          'Exact solution for steady, fully-developed laminar flow in a round pipe. The velocity profile is parabolic; V_max = 2V_avg.',
      },
      {
        id: 'aer316-card-darcy-weisbach',
        order: 2,
        tag: 'Major Losses',
        tagBg: '#DBEAFE',
        tagColor: '#1D4ED8',
        title: 'Darcy-Weisbach major head loss',
        formula: 'h_f = f\\dfrac{L}{D}\\dfrac{V^2}{2g}',
        formulaDisplay: true,
        notes:
          '<strong>f</strong> = Darcy friction factor (dimensionless), <strong>L</strong> = pipe length, <strong>D</strong> = diameter. Valid for both laminar and turbulent flow, given the correct f.',
      },
      {
        id: 'aer316-card-colebrook-equation',
        order: 3,
        tag: 'Moody/Friction Factor',
        tagBg: '#EFF6FF',
        tagColor: '#2563EB',
        title: 'Colebrook equation',
        formula:
          '\\dfrac{1}{\\sqrt{f}} = -2.0\\log_{10}\\left(\\dfrac{\\varepsilon/D}{3.7} + \\dfrac{2.51}{Re\\sqrt{f}}\\right)',
        formulaDisplay: true,
        notes:
          'Implicit equation for the turbulent friction factor f from relative roughness ε/D and Re; solved iteratively or read off the Moody diagram.',
      },
      {
        id: 'aer316-card-swamee-jain',
        order: 4,
        tag: 'Moody/Friction Factor',
        tagBg: '#EFF6FF',
        tagColor: '#2563EB',
        title: 'Swamee-Jain equation (explicit)',
        formula:
          'f = \\dfrac{0.25}{\\left[\\log_{10}\\left(\\dfrac{\\varepsilon/D}{3.7} + \\dfrac{5.74}{Re^{0.9}}\\right)\\right]^2}',
        formulaDisplay: true,
        notes:
          'Explicit approximation to Colebrook, accurate to within ~1% for 4000 &lt; Re &lt; 10⁸ and 10⁻⁶ &lt; ε/D &lt; 10⁻².',
      },
      {
        id: 'aer316-card-moody-appendix-note',
        order: 5,
        tag: 'Moody Chart',
        tagBg: '#EFF6FF',
        tagColor: '#3B82F6',
        title: 'Moody diagram & appendix property tables',
        notes:
          'Use the textbook appendix Moody chart and fluid-property tables (permitted exam references) to read f directly from Re and ε/D, or to look up ρ and μ — not reproduced on this sheet.',
      },
      {
        id: 'aer316-card-minor-losses',
        order: 6,
        tag: 'Minor Losses',
        tagBg: '#DBEAFE',
        tagColor: '#1E3A8A',
        title: 'Minor losses',
        formula: 'h_L = K\\dfrac{V^2}{2g}',
        formulaDisplay: true,
        notes:
          '<strong>K</strong> = loss coefficient for a fitting, valve, entrance, or exit. Sum every K·V²/2g term (plus f·L/D·V²/2g) to get the total head loss in a pipeline.',
      },
      {
        id: 'aer316-card-minor-loss-k-table',
        order: 7,
        tag: 'Minor Losses',
        tagBg: '#DBEAFE',
        tagColor: '#1E3A8A',
        title: 'Typical minor-loss K values',
        tableRows: [
          { symbol: 'K_entrance (sharp)', value: '0.5', quantity: 'Sharp-edged pipe entrance' },
          { symbol: 'K_entrance (rounded)', value: '0.04', quantity: 'Well-rounded entrance' },
          { symbol: 'K_exit', value: '1.0', quantity: 'Pipe exit into a large reservoir' },
          { symbol: 'K_elbow (90°, std.)', value: '0.9', quantity: 'Standard 90° threaded elbow' },
          { symbol: 'K_elbow (90°, long radius)', value: '0.6', quantity: 'Long-radius 90° elbow' },
          { symbol: 'K_gate valve (open)', value: '0.2', quantity: 'Fully open gate valve' },
          { symbol: 'K_globe valve (open)', value: '10', quantity: 'Fully open globe valve' },
        ],
        notes: 'Representative values only — use the textbook appendix table for the exact fitting/valve values.',
      },
      {
        id: 'aer316-card-equivalent-length',
        order: 8,
        tag: 'Equivalent Length',
        tagBg: '#EFF6FF',
        tagColor: '#2563EB',
        title: 'Equivalent length method',
        subs: [
          { latex: '\\dfrac{L_e}{D} = \\dfrac{K}{f}' },
          { latex: 'h_L = f\\dfrac{L_e}{D}\\dfrac{V^2}{2g}' },
        ],
        notes:
          'Expresses a fitting\'s minor loss as an equivalent length of straight pipe at the same friction factor f, so it can be added directly to the physical pipe length.',
      },
      {
        id: 'aer316-card-pipe-systems-series-parallel',
        order: 9,
        tag: 'Pipe Systems',
        tagBg: '#DBEAFE',
        tagColor: '#1D4ED8',
        title: 'Pipe systems — series & parallel',
        subs: [
          { latex: '\\dot V_1 = \\dot V_2 = \\dots, \\quad h_{L,\\text{total}} = \\sum h_{L,i} \\quad \\text{(series)}' },
          { latex: 'h_{L,1} = h_{L,2} = \\dots, \\quad \\dot V_{\\text{total}} = \\sum \\dot V_i \\quad \\text{(parallel)}' },
        ],
        notes:
          'Series pipes share the same flow rate and add head losses; parallel pipes share the same head loss across each branch and add flow rates.',
      },
    ],
  },
]
