import type { Course } from '@/types'

// Helper to make a card id deterministic
let _cid = 0
function cid() { return `default-card-${++_cid}` }
let _sid = 0
function sid() { return `default-sec-${++_sid}` }

export const DEFAULT_COURSES: Course[] = [
  // ─── PCS125 ────────────────────────────────────────────────────────────────
  {
    id: 'default-pcs125',
    code: 'PCS125',
    name: 'Physics for Scientists & Engineers',
    description: 'Chapters 15–30 · Serway & Jewett, 9th edition',
    accent: '#1d4ed8', accentBg: '#dbeafe', accentFg: '#1e3a8a',
    accentBgDark: '#1e3a5f', accentFgDark: '#93c5fd',
    isDefault: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    sections: [
      {
        id: sid(), label: 'Physical Constants', cat: 'const', order: 0,
        cards: [
          { id: cid(), order: 0, tag: 'Constants', tagBg: '#E8F0FE', tagColor: '#1a47a3', title: 'Fundamental constants',
            tableRows: [
              { symbol: 'g', value: '9.81 m/s²', quantity: 'Gravitational acceleration (surface)' },
              { symbol: 'c', value: '3.00 × 10⁸ m/s', quantity: 'Speed of light in vacuum' },
              { symbol: 'G', value: '6.674 × 10⁻¹¹ N·m²/kg²', quantity: 'Gravitational constant' },
              { symbol: 'kₑ', value: '8.988 × 10⁹ N·m²/C²', quantity: 'Coulomb constant' },
              { symbol: 'e', value: '1.602 × 10⁻¹⁹ C', quantity: 'Elementary charge' },
              { symbol: 'mₑ', value: '9.109 × 10⁻³¹ kg', quantity: 'Electron mass' },
              { symbol: 'ε₀', value: '8.854 × 10⁻¹² C²/(N·m²)', quantity: 'Permittivity of free space' },
              { symbol: 'μ₀', value: '4π × 10⁻⁷ T·m/A', quantity: 'Permeability of free space' },
              { symbol: 'I₀', value: '10⁻¹² W/m²', quantity: 'Threshold of hearing' },
            ]
          },
          { id: cid(), order: 1, tag: 'Relations', tagBg: '#E8F0FE', tagColor: '#1a47a3', title: 'Key constant relations',
            subs: [
              { latex: 'k_e = \\dfrac{1}{4\\pi\\varepsilon_0}' },
              { latex: 'c = \\dfrac{1}{\\sqrt{\\mu_0\\varepsilon_0}}' },
              { latex: 'e = 1.602\\times10^{-19}\\,\\text{C}' },
            ],
            notes: '<strong>Note:</strong> kₑ and 1/(4πε₀) are completely interchangeable.'
          },
        ]
      },
      {
        id: sid(), label: 'Oscillations — Simple Harmonic Motion (Ch. 15)', cat: 'shm', order: 1,
        cards: [
          { id: cid(), order: 0, tag: 'SHM', tagBg: '#EEF0FB', tagColor: '#3730a3', title: 'Position, velocity, acceleration',
            subs: [
              { latex: 'x(t) = A\\cos(\\omega t + \\phi)' },
              { latex: 'v(t) = -A\\omega\\sin(\\omega t + \\phi)' },
              { latex: 'a(t) = -A\\omega^2\\cos(\\omega t + \\phi)' },
            ],
            notes: '<strong>A</strong> = amplitude, <strong>ω</strong> = angular frequency, <strong>φ</strong> = phase constant. Note: a = −ω²x always holds in SHM.'
          },
          { id: cid(), order: 1, tag: 'SHM', tagBg: '#EEF0FB', tagColor: '#3730a3', title: 'Angular frequency — systems',
            subs: [
              { latex: '\\omega = \\sqrt{\\dfrac{k}{m}}\\quad\\text{[spring]}' },
              { latex: '\\omega = \\sqrt{\\dfrac{g}{L}}\\quad\\text{[simple pendulum]}' },
              { latex: '\\omega = \\sqrt{\\dfrac{mgd}{I}}\\quad\\text{[physical pendulum]}' },
            ],
            notes: '<strong>k</strong> = spring constant, <strong>d</strong> = distance from pivot to CoM, <strong>I</strong> = moment of inertia.'
          },
          { id: cid(), order: 2, tag: 'Period', tagBg: '#EEF0FB', tagColor: '#3730a3', title: 'Period and frequency',
            subs: [
              { latex: 'T = \\dfrac{2\\pi}{\\omega} = \\dfrac{1}{f}' },
              { latex: 'T_{\\text{spring}} = 2\\pi\\sqrt{\\dfrac{m}{k}}' },
              { latex: 'T_{\\text{pend}} = 2\\pi\\sqrt{\\dfrac{L}{g}}' },
            ],
            notes: 'Period is independent of amplitude for ideal SHM.'
          },
          { id: cid(), order: 3, tag: 'Energy', tagBg: '#EEF0FB', tagColor: '#3730a3', title: 'Energy in SHM',
            subs: [
              { latex: 'E = \\tfrac{1}{2}kA^2' },
              { latex: 'K = \\tfrac{1}{2}mv^2 = \\tfrac{1}{2}k(A^2-x^2)' },
              { latex: 'U = \\tfrac{1}{2}kx^2' },
            ],
            notes: 'Total mechanical energy E is constant. K + U = E always.'
          },
          { id: cid(), order: 4, tag: 'Velocity', tagBg: '#EEF0FB', tagColor: '#3730a3', title: 'Speed as function of position',
            formula: 'v = \\pm\\,\\omega\\sqrt{A^2 - x^2}', formulaDisplay: true,
            notes: 'Derived from energy conservation. Maximum speed v_max = Aω at x = 0.'
          },
          { id: cid(), order: 5, tag: 'Damped', tagBg: '#E0E7FF', tagColor: '#312e81', title: 'Damped oscillation',
            formula: 'x(t) = Ae^{-bt/2m}\\cos(\\omega_d t + \\phi)', formulaDisplay: true,
            notes: '<strong>b</strong> = damping coefficient. Amplitude decays exponentially. Underdamped when b² < 4mk.'
          },
          { id: cid(), order: 6, tag: 'Damped', tagBg: '#E0E7FF', tagColor: '#312e81', title: 'Damped angular frequency',
            formula: '\\omega_d = \\sqrt{\\omega_0^2 - \\left(\\frac{b}{2m}\\right)^2}', formulaDisplay: true,
            notes: 'At critical damping ωd → 0.'
          },
          { id: cid(), order: 7, tag: 'Driven', tagBg: '#E0E7FF', tagColor: '#312e81', title: 'Driven oscillation amplitude',
            formula: 'A = \\frac{F_0/m}{\\sqrt{(\\omega^2-\\omega_0^2)^2+(b\\omega/m)^2}}', formulaDisplay: true,
            notes: '<strong>Resonance</strong> when driving ω ≈ ω₀.'
          },
        ]
      },
      {
        id: sid(), label: 'Mechanical Waves (Ch. 16–17)', cat: 'wave', order: 2,
        cards: [
          { id: cid(), order: 0, tag: 'Wave', tagBg: '#E0F2FE', tagColor: '#0369a1', title: 'Wave parameters',
            subs: [{ latex: 'v = f\\lambda' }, { latex: 'k = \\dfrac{2\\pi}{\\lambda}' }, { latex: 'T = \\dfrac{2\\pi}{\\omega}' }],
            notes: '<strong>k</strong> = wave number (rad/m), <strong>λ</strong> = wavelength.'
          },
          { id: cid(), order: 1, tag: 'Wave', tagBg: '#E0F2FE', tagColor: '#0369a1', title: 'Travelling wave equation',
            formula: 'y(x,t) = A\\sin(kx - \\omega t + \\phi)', formulaDisplay: true,
            notes: 'Minus sign → wave travels in +x direction.'
          },
          { id: cid(), order: 2, tag: 'Speed', tagBg: '#E0F2FE', tagColor: '#0369a1', title: 'Wave speed — media',
            subs: [
              { latex: 'v = \\sqrt{\\dfrac{T_{\\!s}}{\\mu}}\\quad\\text{[string]}' },
              { latex: 'v = \\sqrt{\\dfrac{B}{\\rho}}\\quad\\text{[fluid]}' },
              { latex: 'v = 331\\sqrt{1+\\dfrac{T_C}{273}}\\quad\\text{[air]}' },
            ],
            notes: '<strong>Tₛ</strong> = tension, <strong>μ</strong> = linear mass density.'
          },
          { id: cid(), order: 3, tag: 'Power', tagBg: '#E0F2FE', tagColor: '#0369a1', title: 'Power on string',
            formula: 'P = \\tfrac{1}{2}\\mu\\omega^2 A^2 v', formulaDisplay: true,
            notes: 'Power ∝ A² and ∝ ω².'
          },
          { id: cid(), order: 4, tag: 'Standing', tagBg: '#E0F2FE', tagColor: '#0369a1', title: 'Standing waves',
            formula: 'y = 2A\\sin(kx)\\cos(\\omega t)', formulaDisplay: true,
            notes: 'Nodes at x = nλ/2. Antinodes at x = (2n+1)λ/4.'
          },
          { id: cid(), order: 5, tag: 'Harmonics', tagBg: '#E0F2FE', tagColor: '#0369a1', title: 'Harmonics — strings & pipes',
            subs: [
              { latex: 'f_n = n\\dfrac{v}{2L}\\quad\\text{[string, both fixed]}' },
              { latex: 'f_n = n\\dfrac{v}{2L}\\quad\\text{[pipe, both open]}' },
              { latex: 'f_n = (2n-1)\\dfrac{v}{4L}\\quad\\text{[pipe, one closed]}' },
            ],
            notes: 'One closed end: odd harmonics only.'
          },
          { id: cid(), order: 6, tag: 'Phase', tagBg: '#E0F2FE', tagColor: '#0369a1', title: 'Phase difference from path difference',
            formula: '\\Delta\\phi = \\frac{2\\pi}{\\lambda}\\,|r_2 - r_1|', formulaDisplay: true,
            notes: 'Constructive if Δφ = 2πm; destructive if Δφ = π(2m+1).'
          },
        ]
      },
      {
        id: sid(), label: 'Sound, Intensity & Doppler (Ch. 17)', cat: 'sound', order: 3,
        cards: [
          { id: cid(), order: 0, tag: 'Intensity', tagBg: '#DBEAFE', tagColor: '#1e40af', title: 'Intensity from point source',
            formula: 'I = \\frac{P}{4\\pi r^2}', formulaDisplay: true,
            notes: 'Doubling distance → ¼ intensity.'
          },
          { id: cid(), order: 1, tag: 'Decibels', tagBg: '#DBEAFE', tagColor: '#1e40af', title: 'Sound intensity level',
            formula: '\\beta = 10\\log_{10}\\!\\left(\\frac{I}{I_0}\\right)\\quad[\\text{dB}]', formulaDisplay: true,
            notes: '<strong>I₀ = 10⁻¹² W/m²</strong>. Every 10 dB → 10× intensity.'
          },
          { id: cid(), order: 2, tag: 'Doppler', tagBg: '#DBEAFE', tagColor: '#1e40af', title: 'Doppler effect',
            formula: "f' = f\\cdot\\frac{v + v_O}{v - v_S}", formulaDisplay: true,
            notes: 'Observer in numerator, source in denominator. + toward, − away.'
          },
          { id: cid(), order: 3, tag: 'Beats', tagBg: '#DBEAFE', tagColor: '#1e40af', title: 'Beat frequency',
            formula: 'f_{\\text{beat}} = |f_1 - f_2|', formulaDisplay: true,
            notes: 'Used in instrument tuning.'
          },
        ]
      },
      {
        id: sid(), label: 'Gravity & Gravitational Field (Ch. 13)', cat: 'grav', order: 4,
        cards: [
          { id: cid(), order: 0, tag: 'Gravity', tagBg: '#F0FDF4', tagColor: '#166534', title: "Newton's law of gravitation",
            formula: 'F_g = \\frac{Gm_1 m_2}{r^2}', formulaDisplay: true,
            notes: 'Always attractive. Valid for point masses or spherically symmetric bodies.'
          },
          { id: cid(), order: 1, tag: 'Potential', tagBg: '#F0FDF4', tagColor: '#166534', title: 'Gravitational potential energy',
            formula: 'U(r) = -\\frac{GMm}{r}', formulaDisplay: true,
            notes: 'Negative sign essential. Bound orbits have E < 0.'
          },
          { id: cid(), order: 2, tag: 'Escape', tagBg: '#F0FDF4', tagColor: '#166534', title: 'Escape speed',
            formula: 'v_{\\text{esc}} = \\sqrt{\\frac{2GM}{R}}', formulaDisplay: true,
            notes: 'For Earth: ≈ 11.2 km/s.'
          },
          { id: cid(), order: 3, tag: 'Orbit', tagBg: '#F0FDF4', tagColor: '#166534', title: 'Circular orbit & Kepler 3rd',
            subs: [
              { latex: 'v_{\\text{orb}} = \\sqrt{\\dfrac{GM}{r}}' },
              { latex: 'T^2 = \\dfrac{4\\pi^2}{GM}r^3' },
            ],
            notes: 'Gravitational force = centripetal force for circular orbit.'
          },
        ]
      },
      {
        id: sid(), label: "Electrostatics (Ch. 23)", cat: 'elec', order: 5,
        cards: [
          { id: cid(), order: 0, tag: 'Coulomb', tagBg: '#FEF3C7', tagColor: '#92400e', title: "Coulomb's law",
            formula: 'F = k_e\\frac{|q_1||q_2|}{r^2}', formulaDisplay: true,
            notes: 'kₑ = 8.988 × 10⁹ N·m²/C². Superposition applies.'
          },
          { id: cid(), order: 1, tag: 'E-Field', tagBg: '#FEF3C7', tagColor: '#92400e', title: 'E-field from point charge',
            formula: 'E = k_e\\frac{|q|}{r^2}', formulaDisplay: true,
            notes: 'Direction: outward from +, inward to −.'
          },
          { id: cid(), order: 2, tag: 'Plane', tagBg: '#FEF3C7', tagColor: '#92400e', title: 'E-field — infinite plane',
            formula: '|E| = \\frac{\\sigma}{2\\varepsilon_0}', formulaDisplay: true,
            notes: 'Uniform, independent of distance.'
          },
          { id: cid(), order: 3, tag: 'Dipole', tagBg: '#FEF3C7', tagColor: '#92400e', title: 'Electric dipole',
            subs: [
              { latex: '\\vec{p} = q\\vec{d}' },
              { latex: '\\vec{\\tau} = \\vec{p}\\times\\vec{E}' },
              { latex: 'U = -\\vec{p}\\cdot\\vec{E}' },
            ],
            notes: '<strong>p</strong> points from − to + charge.'
          },
          { id: cid(), order: 4, tag: 'Energy', tagBg: '#FEF3C7', tagColor: '#92400e', title: 'Electric PE (two charges)',
            formula: 'U = k_e\\frac{q_1 q_2}{r}', formulaDisplay: true,
            notes: 'Sign matters: U > 0 repulsive, U < 0 attractive.'
          },
        ]
      },
      {
        id: sid(), label: "Gauss's Law (Ch. 24)", cat: 'gauss', order: 6,
        cards: [
          { id: cid(), order: 0, tag: 'Gauss', tagBg: '#FDE68A', tagColor: '#78350f', title: "Gauss's Law",
            formula: '\\oint\\vec{E}\\cdot d\\vec{A} = \\frac{q_{\\text{in}}}{\\varepsilon_0}', formulaDisplay: true,
            notes: 'Only charge inside the Gaussian surface contributes.'
          },
          { id: cid(), order: 1, tag: 'Line', tagBg: '#FDE68A', tagColor: '#78350f', title: 'E-field — infinite line charge',
            formula: 'E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}', formulaDisplay: true,
            notes: 'Use cylindrical Gaussian surface coaxial with wire.'
          },
          { id: cid(), order: 2, tag: 'Shell', tagBg: '#FDE68A', tagColor: '#78350f', title: 'E-field — spherical shell',
            subs: [
              { latex: 'E = \\dfrac{k_e Q}{r^2}\\quad(r\\ge R)' },
              { latex: 'E = 0\\quad(r < R)\\;\\text{[hollow shell]}' },
              { latex: 'E = k_e\\dfrac{Qr}{R^3}\\quad(r\\le R)\\;\\text{[solid]}' },
            ],
            notes: 'Inside hollow shell: E = 0 everywhere.'
          },
        ]
      },
      {
        id: sid(), label: 'Electric Potential (Ch. 25)', cat: 'pot', order: 7,
        cards: [
          { id: cid(), order: 0, tag: 'Potential', tagBg: '#FCEEF8', tagColor: '#7e22ce', title: 'Electric potential — point charge',
            formula: 'V = k_e\\frac{q}{r}', formulaDisplay: true,
            notes: 'V is a scalar. Reference V = 0 at r → ∞.'
          },
          { id: cid(), order: 1, tag: 'E from V', tagBg: '#FCEEF8', tagColor: '#7e22ce', title: 'Electric field from potential',
            subs: [
              { latex: 'E_x = -\\dfrac{\\partial V}{\\partial x}' },
              { latex: 'E_y = -\\dfrac{\\partial V}{\\partial y}' },
              { latex: 'E_z = -\\dfrac{\\partial V}{\\partial z}' },
            ],
            notes: 'E = −∇V. E points from high V toward low V.'
          },
          { id: cid(), order: 2, tag: 'Capacitor', tagBg: '#FCEEF8', tagColor: '#7e22ce', title: 'Parallel-plate capacitor',
            subs: [
              { latex: 'C = \\dfrac{Q}{|\\Delta V|}' },
              { latex: 'C = \\varepsilon_0\\dfrac{A}{d}' },
              { latex: 'U_C = \\tfrac{1}{2}C(\\Delta V)^2' },
            ],
            notes: 'With dielectric: C = κε₀A/d.'
          },
        ]
      },
      {
        id: sid(), label: 'DC Circuits (Ch. 27–28)', cat: 'circ', order: 8,
        cards: [
          { id: cid(), order: 0, tag: 'Resistance', tagBg: '#FFF1F2', tagColor: '#9f1239', title: "Ohm's law & resistance",
            subs: [
              { latex: '\\Delta V = IR' },
              { latex: 'R = \\dfrac{\\rho\\, \\ell}{A}' },
            ],
            notes: '<strong>ρ</strong> = resistivity, <strong>ℓ</strong> = length, <strong>A</strong> = cross-section.'
          },
          { id: cid(), order: 1, tag: 'Power', tagBg: '#FFF1F2', tagColor: '#9f1239', title: 'Electrical power',
            formula: 'P = I\\Delta V = I^2 R = \\dfrac{(\\Delta V)^2}{R}', formulaDisplay: true,
            notes: 'All three forms equivalent via Ohm\'s law.'
          },
          { id: cid(), order: 2, tag: 'Resistors', tagBg: '#FFF1F2', tagColor: '#9f1239', title: 'Resistors in series & parallel',
            subs: [
              { latex: 'R_{\\text{series}} = R_1+R_2+\\cdots' },
              { latex: '\\dfrac{1}{R_{\\text{par}}} = \\dfrac{1}{R_1}+\\dfrac{1}{R_2}+\\cdots' },
            ],
            notes: 'For 2 parallel: R_par = R₁R₂/(R₁+R₂).'
          },
          { id: cid(), order: 3, tag: 'RC', tagBg: '#FFF1F2', tagColor: '#9f1239', title: 'RC circuits',
            subs: [
              { latex: 'q(t) = C\\mathcal{E}\\left(1-e^{-t/RC}\\right)\\;\\text{[charging]}' },
              { latex: 'q(t) = Q_0\\,e^{-t/RC}\\;\\text{[discharging]}' },
            ],
            notes: '<strong>τ = RC</strong>. At t = τ: 63.2% charged or 36.8% remaining.'
          },
        ]
      },
      {
        id: sid(), label: 'Magnetism (Ch. 29–30)', cat: 'mag', order: 9,
        cards: [
          { id: cid(), order: 0, tag: 'Force', tagBg: '#F0F9FF', tagColor: '#0c4a6e', title: 'Magnetic force on charge',
            formula: '\\vec{F} = q\\vec{v}\\times\\vec{B}\\quad |F|=qvB\\sin\\theta', formulaDisplay: true,
            notes: 'Magnetic force does NO work. Cannot change speed, only direction.'
          },
          { id: cid(), order: 1, tag: 'Circular', tagBg: '#F0F9FF', tagColor: '#0c4a6e', title: 'Circular motion in B field',
            subs: [
              { latex: 'r = \\dfrac{mv}{|q|B}' },
              { latex: 'T = \\dfrac{2\\pi m}{|q|B}' },
            ],
            notes: 'Period T is independent of speed (cyclotron principle).'
          },
          { id: cid(), order: 2, tag: 'Biot-Savart', tagBg: '#E0F2FE', tagColor: '#075985', title: 'Biot-Savart law',
            formula: 'dB = \\frac{\\mu_0 I}{4\\pi}\\frac{ds\\sin\\theta}{r^2}', formulaDisplay: true,
            notes: 'Integrate along the entire current path.'
          },
          { id: cid(), order: 3, tag: 'B-Fields', tagBg: '#E0F2FE', tagColor: '#075985', title: 'B-fields — special cases',
            subs: [
              { latex: 'B = \\dfrac{\\mu_0 I}{2\\pi a}\\quad\\text{[long wire]}' },
              { latex: 'B = \\dfrac{\\mu_0 I}{2a}\\quad\\text{[loop centre]}' },
              { latex: 'B = \\mu_0 nI\\quad\\text{[solenoid inside]}' },
            ],
            notes: 'Use right-hand rule for direction.'
          },
          { id: cid(), order: 4, tag: 'Ampere', tagBg: '#E0F2FE', tagColor: '#075985', title: "Ampère's law",
            formula: '\\oint\\vec{B}\\cdot d\\vec{s} = \\mu_0 I_{\\text{enc}}', formulaDisplay: true,
            notes: 'Choose Amperian loop where B is constant and tangential.'
          },
        ]
      },
    ]
  },

  // ─── MTH240 ────────────────────────────────────────────────────────────────
  {
    id: 'default-mth240',
    code: 'MTH240',
    name: 'Calculus II',
    description: 'Labs 1–10 · Strang & Herman Vol. 2 & 3',
    accent: '#7c3aed', accentBg: '#ede9fe', accentFg: '#4c1d95',
    accentBgDark: '#2e1065', accentFgDark: '#c4b5fd',
    isDefault: true,
    createdAt: '2026-01-01T00:01:00Z',
    updatedAt: '2026-01-01T00:01:00Z',
    sections: [
      {
        id: sid(), label: 'Trig Identities', cat: 'trig-id', order: 0,
        cards: [
          { id: cid(), order: 0, tag: 'Pythagorean', tagBg: '#ccf0e2', tagColor: '#085a42', title: 'Pythagorean identities',
            subs: [
              { latex: '\\sin^2\\theta+\\cos^2\\theta=1' },
              { latex: '1+\\tan^2\\theta=\\sec^2\\theta' },
              { latex: '1+\\cot^2\\theta=\\csc^2\\theta' },
            ]
          },
          { id: cid(), order: 1, tag: 'Half-angle', tagBg: '#ccf0e2', tagColor: '#085a42', title: 'Half-angle / power-reduction',
            subs: [
              { latex: '\\sin^2\\theta=\\dfrac{1-\\cos 2\\theta}{2}' },
              { latex: '\\cos^2\\theta=\\dfrac{1+\\cos 2\\theta}{2}' },
            ],
            notes: 'Essential for even-power trig integrals.'
          },
          { id: cid(), order: 2, tag: 'Double-angle', tagBg: '#ccf0e2', tagColor: '#085a42', title: 'Double-angle identities',
            subs: [
              { latex: '\\sin 2\\theta=2\\sin\\theta\\cos\\theta' },
              { latex: '\\cos 2\\theta=\\cos^2\\!\\theta-\\sin^2\\!\\theta' },
              { latex: '\\tan 2\\theta=\\dfrac{2\\tan\\theta}{1-\\tan^2\\!\\theta}' },
            ]
          },
          { id: cid(), order: 3, tag: 'Inverse trig', tagBg: '#ccf0e2', tagColor: '#085a42', title: 'Inverse trig antiderivatives',
            subs: [
              { latex: '\\int\\dfrac{dx}{\\sqrt{a^2-x^2}}=\\arcsin\\dfrac{x}{a}+C' },
              { latex: '\\int\\dfrac{dx}{a^2+x^2}=\\dfrac{1}{a}\\arctan\\dfrac{x}{a}+C' },
            ]
          },
        ]
      },
      {
        id: sid(), label: 'Integration by Parts — Lab 1', cat: 'ibp', order: 1,
        cards: [
          { id: cid(), order: 0, tag: 'IBP', tagBg: '#EEEDFE', tagColor: '#3C3489', title: 'Core formula',
            formula: '\\int u\\,dv = uv - \\int v\\,du', formulaDisplay: true,
            notes: '<strong>LIATE priority for u:</strong> Logarithm → Inverse trig → Algebraic → Trig → Exponential.'
          },
          { id: cid(), order: 1, tag: 'IBP', tagBg: '#EEEDFE', tagColor: '#3C3489', title: 'Cyclic IBP — solve algebraically',
            formula: '\\int e^x\\cos x\\,dx=\\frac{e^x(\\cos x+\\sin x)}{2}+C', formulaDisplay: true,
            notes: 'Apply IBP twice. Collect the original integral and divide.'
          },
          { id: cid(), order: 2, tag: 'IBP', tagBg: '#EEEDFE', tagColor: '#3C3489', title: 'Reduction formulas',
            subs: [
              { latex: '\\int\\ln x\\,dx=x\\ln x-x+C' },
              { latex: '\\int\\arctan x\\,dx=x\\arctan x-\\tfrac{1}{2}\\ln(1{+}x^2)+C' },
              { latex: '\\int\\arcsin x\\,dx=x\\arcsin x+\\sqrt{1-x^2}+C' },
            ]
          },
        ]
      },
      {
        id: sid(), label: 'Trig Integrals & Substitution — Lab 2', cat: 'trig', order: 2,
        cards: [
          { id: cid(), order: 0, tag: 'Trig Sub', tagBg: '#E1F5EE', tagColor: '#0F6E56', title: 'Trig substitution table',
            subs: [
              { latex: '\\sqrt{a^2{-}x^2}\\Rightarrow x=a\\sin\\theta' },
              { latex: '\\sqrt{a^2{+}x^2}\\Rightarrow x=a\\tan\\theta' },
              { latex: '\\sqrt{x^2{-}a^2}\\Rightarrow x=a\\sec\\theta' },
            ],
            notes: 'Back-substitute using a triangle.'
          },
          { id: cid(), order: 1, tag: 'Antiderivatives', tagBg: '#E1F5EE', tagColor: '#0F6E56', title: 'Standard trig antiderivatives',
            subs: [
              { latex: '\\int\\tan x\\,dx=\\ln|\\sec x|+C' },
              { latex: '\\int\\sec x\\,dx=\\ln|\\sec x+\\tan x|+C' },
              { latex: '\\int\\sec^2 x\\,dx=\\tan x+C' },
              { latex: '\\int\\csc^2 x\\,dx=-\\cot x+C' },
            ]
          },
        ]
      },
      {
        id: sid(), label: 'Partial Fractions — Lab 3', cat: 'pfrac', order: 3,
        cards: [
          { id: cid(), order: 0, tag: 'PFrac', tagBg: '#FAECE7', tagColor: '#712B13', title: 'Setup rules',
            notes: '<strong>Step 0:</strong> if deg(num) ≥ deg(denom), do polynomial long division first.<br><strong>Linear (x−a):</strong> A/(x−a)<br><strong>Repeated (x−a)ⁿ:</strong> A₁/(x−a) + ⋯ + Aₙ/(x−a)ⁿ<br><strong>Irreducible quadratic:</strong> (Ax+B)/(ax²+bx+c)'
          },
          { id: cid(), order: 1, tag: 'PFrac', tagBg: '#FAECE7', tagColor: '#712B13', title: 'Key antiderivatives',
            subs: [
              { latex: '\\int\\frac{dx}{x-a}=\\ln|x-a|+C' },
              { latex: '\\int\\frac{dx}{x^2+a^2}=\\frac{1}{a}\\arctan\\frac{x}{a}+C' },
              { latex: '\\int\\frac{f\'(x)}{f(x)}\\,dx=\\ln|f(x)|+C' },
            ]
          },
        ]
      },
      {
        id: sid(), label: 'Improper Integrals — Lab 4', cat: 'imp', order: 4,
        cards: [
          { id: cid(), order: 0, tag: 'Improper', tagBg: '#FAEEDA', tagColor: '#633806', title: 'Definition — infinite limits',
            formula: '\\int_a^\\infty f\\,dx=\\lim_{R\\to\\infty}\\int_a^R f\\,dx', formulaDisplay: true,
            notes: 'Converges iff the limit exists and is finite.'
          },
          { id: cid(), order: 1, tag: 'Improper', tagBg: '#FAEEDA', tagColor: '#633806', title: 'p-integral benchmarks',
            subs: [
              { latex: '\\int_1^\\infty\\frac{dx}{x^p}\\begin{cases}\\text{conv.}&p>1\\\\\\text{div.}&p\\le1\\end{cases}' },
              { latex: '\\int_0^1\\frac{dx}{x^p}\\begin{cases}\\text{conv.}&p<1\\\\\\text{div.}&p\\ge1\\end{cases}' },
            ],
            notes: 'Primary comparison anchors.'
          },
        ]
      },
      {
        id: sid(), label: "L'Hôpital's Rule & Limits", cat: 'lhop', order: 5,
        cards: [
          { id: cid(), order: 0, tag: "L'Hôpital", tagBg: '#FAEEDA', tagColor: '#633806', title: "L'Hôpital's rule",
            formula: "\\lim_{x\\to a}\\frac{f(x)}{g(x)}=\\lim_{x\\to a}\\frac{f'(x)}{g'(x)}", formulaDisplay: true,
            notes: '<strong>Only valid for 0/0 or ∞/∞ forms.</strong> Differentiate numerator and denominator separately.'
          },
          { id: cid(), order: 1, tag: 'Limits', tagBg: '#FAEEDA', tagColor: '#633806', title: 'Key limit facts',
            subs: [
              { latex: '\\lim_{x\\to0^+}x^n\\ln x=0\\;(n>0)' },
              { latex: '\\lim_{x\\to\\infty}\\frac{x^n}{e^x}=0\\;(\\text{any }n)' },
              { latex: '\\lim_{n\\to\\infty}\\!\\left(1+\\frac{x}{n}\\right)^n=e^x' },
            ]
          },
        ]
      },
      {
        id: sid(), label: 'Differential Equations — Lab 5', cat: 'ode', order: 6,
        cards: [
          { id: cid(), order: 0, tag: 'ODE', tagBg: '#E6F1FB', tagColor: '#0C447C', title: 'Separable ODE',
            formula: "\\frac{dy}{dx}=f(x)g(y)\\;\\Rightarrow\\;\\int\\frac{dy}{g(y)}=\\int f(x)\\,dx+C", formulaDisplay: true,
            notes: 'Divide by g(y). Note any singular solutions where g(y) = 0.'
          },
          { id: cid(), order: 1, tag: 'ODE', tagBg: '#E6F1FB', tagColor: '#0C447C', title: 'Linear first-order — integrating factor',
            formula: "y'+p(x)y=q(x),\\quad I(x)=e^{\\int p(x)\\,dx}", formulaDisplay: true,
            notes: 'Multiply both sides by I. LHS becomes d/dx[I·y]. No +C inside the exponent for I.'
          },
        ]
      },
      {
        id: sid(), label: 'Sequences & Series — Lab 7', cat: 'seq', order: 7,
        cards: [
          { id: cid(), order: 0, tag: 'Geometric', tagBg: '#FBEAF0', tagColor: '#72243E', title: 'Geometric series',
            formula: '\\sum_{n=0}^{\\infty}ar^n=\\frac{a}{1-r},\\quad|r|<1', formulaDisplay: true,
            notes: 'Diverges if |r| ≥ 1.'
          },
          { id: cid(), order: 1, tag: 'p-series', tagBg: '#FBEAF0', tagColor: '#72243E', title: 'p-series',
            formula: '\\sum_{n=1}^{\\infty}\\frac{1}{n^p}\\;\\begin{cases}\\text{converges}&p>1\\\\\\text{diverges}&p\\le1\\end{cases}', formulaDisplay: true,
            notes: 'p = 1: harmonic series diverges. p = 2: Basel series = π²/6.'
          },
          { id: cid(), order: 2, tag: 'Tests', tagBg: '#FBEAF0', tagColor: '#72243E', title: 'Divergence test',
            formula: '\\lim_{n\\to\\infty}a_n\\ne0\\;\\Rightarrow\\;\\sum a_n\\text{ diverges}', formulaDisplay: true,
            notes: '<strong>Always try first.</strong> Converse is FALSE.'
          },
        ]
      },
      {
        id: sid(), label: 'Convergence Tests — Lab 8', cat: 'conv', order: 8,
        cards: [
          { id: cid(), order: 0, tag: 'Ratio', tagBg: '#F1EFE8', tagColor: '#5F5E5A', title: 'Ratio Test',
            formula: 'L=\\lim_{n\\to\\infty}\\left|\\frac{a_{n+1}}{a_n}\\right|', formulaDisplay: true,
            notes: 'L < 1 → converges. L > 1 → diverges. L = 1 → inconclusive. Best for n!, nⁿ, aⁿ.'
          },
          { id: cid(), order: 1, tag: 'AST', tagBg: '#F1EFE8', tagColor: '#5F5E5A', title: 'Alternating Series Test',
            formula: '\\sum(-1)^n b_n\\text{ conv. if: }b_n>0,\\;b_n\\searrow,\\;b_n\\to0', formulaDisplay: true,
            notes: '<strong>Error bound:</strong> |S − Sₙ| ≤ bₙ₊₁.'
          },
          { id: cid(), order: 2, tag: 'Guide', tagBg: '#F1EFE8', tagColor: '#5F5E5A', title: 'Which test? — flowchart',
            notes: '<strong>1.</strong> Divergence test (instant)<br><strong>2.</strong> (f(n))ⁿ → Root test<br><strong>3.</strong> Alternating → AST<br><strong>4.</strong> n!, nⁿ, aⁿ → Ratio test<br><strong>5.</strong> Rational in n → Limit comparison to 1/nᵖ<br><strong>6.</strong> Integrable → Integral test'
          },
        ]
      },
      {
        id: sid(), label: 'Taylor & Maclaurin Series — Lab 10', cat: 'taylor', order: 9,
        cards: [
          { id: cid(), order: 0, tag: 'Taylor', tagBg: '#EAF3DE', tagColor: '#3B6D11', title: 'Taylor series definition',
            formula: 'f(x)=\\sum_{n=0}^{\\infty}\\frac{f^{(n)}(a)}{n!}(x-a)^n', formulaDisplay: true,
            notes: 'Centered at a = 0: Maclaurin series.'
          },
          { id: cid(), order: 1, tag: 'Maclaurin', tagBg: '#EAF3DE', tagColor: '#3B6D11', title: 'Core Maclaurin series',
            subs: [
              { latex: 'e^x=\\sum_{n=0}^\\infty\\frac{x^n}{n!},\\;R=\\infty' },
              { latex: '\\sin x=\\sum_{n=0}^\\infty\\frac{(-1)^n x^{2n+1}}{(2n+1)!}' },
              { latex: '\\cos x=\\sum_{n=0}^\\infty\\frac{(-1)^n x^{2n}}{(2n)!}' },
              { latex: '\\frac{1}{1-x}=\\sum_{n=0}^\\infty x^n,\\;|x|<1' },
              { latex: '\\ln(1+x)=\\sum_{n=1}^\\infty\\frac{(-1)^{n+1}x^n}{n},\\;|x|\\le1' },
              { latex: '\\arctan x=\\sum_{n=0}^\\infty\\frac{(-1)^n x^{2n+1}}{2n+1},\\;|x|\\le1' },
            ]
          },
          { id: cid(), order: 2, tag: 'Taylor', tagBg: '#EAF3DE', tagColor: '#3B6D11', title: 'Taylor remainder & error bound',
            formula: '|R_n(x)|\\le\\frac{M}{(n+1)!}|x-a|^{n+1}', formulaDisplay: true,
            notes: 'M = max|f^(n+1)(t)| on the interval.'
          },
        ]
      },
      {
        id: sid(), label: 'Multivariable Calculus — Partial Derivatives', cat: 'multi', order: 10,
        cards: [
          { id: cid(), order: 0, tag: 'Partial ∂', tagBg: '#E8EAF6', tagColor: '#283593', title: 'Partial derivative key rules',
            notes: '<strong>∂f/∂x:</strong> treat all other variables as constants.<br><strong>Chain rule:</strong> ∂/∂x[f(g)] = f\'(g)·∂g/∂x<br><strong>Simplify first:</strong> e^(ln y) = y, ln(xy) = ln x + ln y'
          },
          { id: cid(), order: 1, tag: 'Chain Rule', tagBg: '#E8EAF6', tagColor: '#283593', title: 'Multivariable chain rule',
            formula: '\\frac{dz}{dt}=\\frac{\\partial z}{\\partial x}\\frac{dx}{dt}+\\frac{\\partial z}{\\partial y}\\frac{dy}{dt}', formulaDisplay: true,
            notes: 'Use when z = f(x,y) and x = x(t), y = y(t).'
          },
          { id: cid(), order: 2, tag: '∂² Mixed', tagBg: '#E8EAF6', tagColor: '#283593', title: "Clairaut's theorem",
            formula: '\\frac{\\partial^2 f}{\\partial y\\,\\partial x}=\\frac{\\partial^2 f}{\\partial x\\,\\partial y}', formulaDisplay: true,
            notes: 'Order of mixed partials doesn\'t matter for continuous partials.'
          },
        ]
      },
    ]
  },

  // ─── MTL200 ────────────────────────────────────────────────────────────────
  {
    id: 'default-mtl200',
    code: 'MTL200',
    name: 'Materials Science & Engineering',
    description: 'Chapters 2–5, 9, 12, 14, 16, 17 · Callister & Rethwisch, 10th ed.',
    accent: '#b45309', accentBg: '#fef3c7', accentFg: '#78350f',
    accentBgDark: '#451a03', accentFgDark: '#fcd34d',
    isDefault: true,
    createdAt: '2026-01-01T00:02:00Z',
    updatedAt: '2026-01-01T00:02:00Z',
    sections: [
      {
        id: sid(), label: 'Crystalline Structures (Ch. 3)', cat: 'crystal', order: 0,
        cards: [
          { id: cid(), order: 0, tag: 'Structure', tagBg: '#FEF9C3', tagColor: '#713F12', title: 'Atomic Packing Factor',
            formula: '\\text{APF} = \\frac{\\text{Volume of atoms}}{\\text{Total unit cell volume}}', formulaDisplay: true,
            notes: 'FCC = 0.74, BCC = 0.68, HCP = 0.74, SC = 0.52.'
          },
          { id: cid(), order: 1, tag: 'Structure', tagBg: '#FEF9C3', tagColor: '#713F12', title: 'Unit cell edge lengths',
            subs: [
              { latex: '\\text{FCC: }a = 2\\sqrt{2}\\,R' },
              { latex: '\\text{BCC: }a = 4R/\\sqrt{3}' },
              { latex: '\\text{SC: }a = 2R' },
              { latex: '\\text{HCP: }a = 2R,\\;c = 4\\sqrt{2}R/3' },
            ],
            notes: 'R = atomic radius.'
          },
          { id: cid(), order: 2, tag: 'X-Ray', tagBg: '#FEF9C3', tagColor: '#713F12', title: "Bragg's Law",
            formula: 'n\\lambda = 2d\\sin\\theta', formulaDisplay: true,
            notes: 'X-ray diffraction. n = order, d = interplanar spacing, θ = glancing angle.'
          },
          { id: cid(), order: 3, tag: 'Structure', tagBg: '#FEF9C3', tagColor: '#713F12', title: 'Theoretical density',
            formula: '\\rho = \\frac{nA}{V_c N_A}', formulaDisplay: true,
            notes: 'n = atoms/cell, A = atomic weight, Vᶜ = cell volume, Nₐ = 6.022×10²³.'
          },
        ]
      },
      {
        id: sid(), label: 'Imperfections in Solids (Ch. 4)', cat: 'defect', order: 1,
        cards: [
          { id: cid(), order: 0, tag: 'Point Defect', tagBg: '#FEE2E2', tagColor: '#7F1D1D', title: 'Equilibrium vacancy concentration',
            formula: 'N_v = N\\exp\\!\\left(-\\frac{Q_v}{kT}\\right)', formulaDisplay: true,
            notes: 'N = total sites, Qᵥ = vacancy formation energy, k = Boltzmann, T in K.'
          },
          { id: cid(), order: 1, tag: 'Composition', tagBg: '#FEE2E2', tagColor: '#7F1D1D', title: 'Composition conversions',
            subs: [
              { latex: '\\text{at\\%}_A = \\dfrac{C_A/A_A}{C_A/A_A + C_B/A_B}\\times100' },
              { latex: '\\text{wt\\%}_A = \\dfrac{n_A A_A}{n_A A_A + n_B A_B}\\times100' },
            ],
            notes: 'Cₐ = wt% of A, Aₐ = atomic weight of A.'
          },
        ]
      },
      {
        id: sid(), label: 'Diffusion (Ch. 5)', cat: 'diffuse', order: 2,
        cards: [
          { id: cid(), order: 0, tag: "Fick's 1st", tagBg: '#DCFCE7', tagColor: '#14532D', title: "Fick's First Law",
            formula: 'J = -D\\frac{dC}{dx}', formulaDisplay: true,
            notes: 'J = flux, D = diffusivity, dC/dx = concentration gradient. Steady-state.'
          },
          { id: cid(), order: 1, tag: "Fick's 2nd", tagBg: '#DCFCE7', tagColor: '#14532D', title: "Fick's Second Law",
            formula: '\\frac{C_x - C_0}{C_s - C_0} = 1 - \\text{erf}\\!\\left(\\frac{x}{2\\sqrt{Dt}}\\right)', formulaDisplay: true,
            notes: 'Non-steady state. erf(0)=0, erf(∞)=1.'
          },
          { id: cid(), order: 2, tag: 'Diffusivity', tagBg: '#DCFCE7', tagColor: '#14532D', title: 'Arrhenius — D(T)',
            formula: 'D = D_0\\exp\\!\\left(-\\frac{Q_d}{RT}\\right)', formulaDisplay: true,
            notes: 'D₀ = pre-exponential, Qd = activation energy, R = 8.314 J/(mol·K).'
          },
        ]
      },
      {
        id: sid(), label: 'Phase Diagrams (Ch. 9)', cat: 'phase', order: 3,
        cards: [
          { id: cid(), order: 0, tag: 'Lever Rule', tagBg: '#E0F2FE', tagColor: '#0C4A6E', title: 'Lever Rule — phase fractions',
            subs: [
              { latex: 'W_\\alpha = \\dfrac{C_L - C_0}{C_L - C_\\alpha}' },
              { latex: 'W_L = \\dfrac{C_0 - C_\\alpha}{C_L - C_\\alpha}' },
            ],
            notes: 'Wₐ + W_L = 1 always. Read Cₐ and C_L from phase boundary at T of interest.'
          },
          { id: cid(), order: 1, tag: 'Gibbs', tagBg: '#E0F2FE', tagColor: '#0C4A6E', title: "Gibbs Phase Rule",
            formula: 'F = C - P + N', formulaDisplay: true,
            notes: 'F = degrees of freedom, C = components, P = phases, N = 1 (fixed pressure).'
          },
          { id: cid(), order: 2, tag: 'Iron-Carbon', tagBg: '#E0F2FE', tagColor: '#0C4A6E', title: 'Fe–Fe₃C key points',
            notes: '<strong>Eutectic (4.30% C, 1147°C):</strong> L → γ + Fe₃C<br><strong>Eutectoid (0.76% C, 727°C):</strong> γ → α + Fe₃C (pearlite)<br><strong>Steels:</strong> < 2.14% C; <strong>Cast irons:</strong> > 2.14% C'
          },
        ]
      },
      {
        id: sid(), label: 'Ceramics (Ch. 12)', cat: 'ceramic', order: 4,
        cards: [
          { id: cid(), order: 0, tag: 'Structure', tagBg: '#F3E8FF', tagColor: '#581C87', title: 'Ceramic crystal edge lengths',
            subs: [
              { latex: '\\text{Rock Salt: }a = 2(r_c + r_a)' },
              { latex: '\\text{CsCl: }a = 4(r_c + r_a)/\\sqrt{3}' },
              { latex: '\\text{Zinc Blende: }a = 2\\sqrt{2}(r_c + r_a)' },
            ],
            notes: 'rᶜ = cation radius, rₐ = anion radius.'
          },
          { id: cid(), order: 1, tag: 'Density', tagBg: '#F3E8FF', tagColor: '#581C87', title: 'Ceramic theoretical density',
            formula: '\\rho = \\frac{n\\sum A_i}{V_c N_A}', formulaDisplay: true,
            notes: 'n = formula units/cell, ΣAᵢ = sum of all ion atomic weights per formula unit.'
          },
        ]
      },
      {
        id: sid(), label: 'Polymers (Ch. 14)', cat: 'polymer', order: 5,
        cards: [
          { id: cid(), order: 0, tag: 'Polymer', tagBg: '#FFF7ED', tagColor: '#7C2D12', title: 'Degree of polymerization',
            formula: '\\text{DP} = \\frac{M_n}{M_{\\text{mer}}}', formulaDisplay: true,
            notes: 'Mₙ = number-average molecular weight, M_mer = repeat unit mass.'
          },
          { id: cid(), order: 1, tag: 'Polymer', tagBg: '#FFF7ED', tagColor: '#7C2D12', title: 'Average molecular weights',
            subs: [
              { latex: 'M_n = \\sum x_i M_i\\quad\\text{(number-average)}' },
              { latex: 'M_w = \\sum w_i M_i\\quad\\text{(weight-average)}' },
            ],
            notes: 'PDI = M_w/M_n measures chain length distribution breadth.'
          },
          { id: cid(), order: 2, tag: 'Crystallinity', tagBg: '#FFF7ED', tagColor: '#7C2D12', title: 'Percent crystallinity',
            formula: '\\%\\text{Cryst.} = \\frac{\\rho_s - \\rho_a}{\\rho_c - \\rho_a}\\times 100', formulaDisplay: true,
            notes: 'ρₛ = sample, ρᶜ = fully crystalline, ρₐ = fully amorphous.'
          },
        ]
      },
      {
        id: sid(), label: 'Mechanical Properties (Ch. 6–7)', cat: 'mech', order: 6,
        cards: [
          { id: cid(), order: 0, tag: 'Stress/Strain', tagBg: '#F0FDF4', tagColor: '#166534', title: 'Engineering stress and strain',
            subs: [
              { latex: '\\sigma = F/A_0' },
              { latex: '\\varepsilon = \\Delta l/l_0' },
            ],
            notes: 'Elastic: σ = Eε (Hooke\'s law). Slope of σ-ε in elastic region = E.'
          },
          { id: cid(), order: 1, tag: 'Elastic', tagBg: '#F0FDF4', tagColor: '#166534', title: "Elastic moduli & Poisson's ratio",
            subs: [
              { latex: '\\sigma = E\\varepsilon' },
              { latex: '\\tau = G\\gamma' },
              { latex: '\\nu = -\\varepsilon_x/\\varepsilon_z' },
            ],
            notes: 'E = 2G(1+ν).'
          },
        ]
      },
      {
        id: sid(), label: 'Failure — Fracture & Fatigue (Ch. 8)', cat: 'fail', order: 7,
        cards: [
          { id: cid(), order: 0, tag: 'Fracture', tagBg: '#FFF1F2', tagColor: '#881337', title: 'Fracture toughness — KIc',
            formula: 'K_{Ic} = Y\\sigma\\sqrt{\\pi a}', formulaDisplay: true,
            notes: 'Y = geometry factor, σ = applied stress, a = half crack length. Critical: a_c = (KIc/Yσ)²/π.'
          },
          { id: cid(), order: 1, tag: 'Fracture', tagBg: '#FFF1F2', tagColor: '#881337', title: 'Stress concentration factor',
            formula: 'K_t = 2\\sqrt{a/\\rho_t}', formulaDisplay: true,
            notes: 'a = half crack length, ρₜ = crack tip radius. Sharper → larger Kₜ.'
          },
        ]
      },
    ]
  },

  // ─── ECN801 ────────────────────────────────────────────────────────────────
  {
    id: 'default-ecn801',
    code: 'ECN801',
    name: 'Engineering Economics',
    description: 'Fraser et al., Engineering Economics, 7th edition',
    accent: '#059669', accentBg: '#d1fae5', accentFg: '#064e3b',
    accentBgDark: '#022c22', accentFgDark: '#6ee7b7',
    isDefault: true,
    createdAt: '2026-01-01T00:03:00Z',
    updatedAt: '2026-01-01T00:03:00Z',
    sections: [
      {
        id: sid(), label: 'Simple & Compound Interest', cat: 'interest', order: 0,
        cards: [
          { id: cid(), order: 0, tag: 'Simple', tagBg: '#ECFDF5', tagColor: '#065F46', title: 'Simple interest',
            formula: 'F = P(1 + Ni)', formulaDisplay: true,
            notes: 'Interest accrues only on the original principal P.'
          },
          { id: cid(), order: 1, tag: 'Compound', tagBg: '#ECFDF5', tagColor: '#065F46', title: 'Single payment factors',
            subs: [
              { latex: 'F = P(1+i)^N = P(F/P,\\,i,\\,N)' },
              { latex: 'P = F(1+i)^{-N} = F(P/F,\\,i,\\,N)' },
            ],
            notes: 'F/P and P/F are reciprocals.'
          },
          { id: cid(), order: 2, tag: 'Effective Rate', tagBg: '#ECFDF5', tagColor: '#065F46', title: 'Effective interest rate',
            formula: 'i_{\\text{eff}} = \\left(1 + \\frac{r}{m}\\right)^m - 1', formulaDisplay: true,
            notes: 'r = nominal rate, m = compounding periods/year.'
          },
          { id: cid(), order: 3, tag: 'Continuous', tagBg: '#ECFDF5', tagColor: '#065F46', title: 'Continuous compounding',
            formula: 'i_e = e^r - 1', formulaDisplay: true,
            notes: 'Limiting case as m → ∞.'
          },
          { id: cid(), order: 4, tag: 'Interpolation', tagBg: '#ECFDF5', tagColor: '#065F46', title: 'Linear interpolation',
            formula: 'y^* = y_1 + (y_2 - y_1)\\dfrac{x^* - x_1}{x_2 - x_1}', formulaDisplay: true,
            notes: 'Valid over small intervals only — interest factors are nonlinear.'
          },
        ]
      },
      {
        id: sid(), label: 'Annuities — Uniform Series', cat: 'annuity', order: 1,
        cards: [
          { id: cid(), order: 0, tag: 'Annuity', tagBg: '#D1FAE5', tagColor: '#064E3B', title: 'Present worth factor (P/A)',
            formula: 'P = A\\left[\\frac{(1+i)^N - 1}{i(1+i)^N}\\right] = A(P/A,\\,i,\\,N)', formulaDisplay: true,
            notes: 'First payment at end of period 1 (ordinary annuity).'
          },
          { id: cid(), order: 1, tag: 'Annuity', tagBg: '#D1FAE5', tagColor: '#064E3B', title: 'Capital recovery factor (A/P)',
            formula: 'A = P\\left[\\frac{i(1+i)^N}{(1+i)^N - 1}\\right] = P(A/P,\\,i,\\,N)', formulaDisplay: true,
            notes: '(A/P) = 1/(P/A). Used for loan payments.'
          },
          { id: cid(), order: 2, tag: 'Annuity', tagBg: '#D1FAE5', tagColor: '#064E3B', title: 'Sinking fund & F/A',
            subs: [
              { latex: 'A = F\\left[\\frac{i}{(1+i)^N - 1}\\right] = F(A/F,\\,i,\\,N)' },
              { latex: 'F = A\\left[\\frac{(1+i)^N - 1}{i}\\right] = A(F/A,\\,i,\\,N)' },
            ],
            notes: 'A/F = A/P − i. F/A = 1/(A/F).'
          },
          { id: cid(), order: 3, tag: 'Capital Recovery', tagBg: '#D1FAE5', tagColor: '#064E3B', title: 'Capital recovery formula',
            subs: [
              { latex: 'CR(i) = P(A/P,\\,i,\\,N) - S(A/F,\\,i,\\,N)' },
              { latex: 'CR(i) = (P - S)(A/P,\\,i,\\,N) + S\\cdot i' },
            ],
            notes: 'P = first cost, S = salvage value. Both forms are equivalent.'
          },
          { id: cid(), order: 4, tag: 'Perpetuity', tagBg: '#D1FAE5', tagColor: '#064E3B', title: 'Perpetual annuity (N→∞)',
            formula: 'P = A/i', formulaDisplay: true,
            notes: 'Used for perpetual endowments and capitalized cost.'
          },
        ]
      },
      {
        id: sid(), label: 'Gradient Series', cat: 'gradient', order: 2,
        cards: [
          { id: cid(), order: 0, tag: 'Linear', tagBg: '#A7F3D0', tagColor: '#065F46', title: 'Arithmetic gradient — P/G',
            formula: 'P_G = G\\left[\\frac{(1+i)^N - iN - 1}{i^2(1+i)^N}\\right] = G(P/G,\\,i,\\,N)', formulaDisplay: true,
            notes: 'G = gradient amount. First gradient payment at end of period 2.'
          },
          { id: cid(), order: 1, tag: 'Linear', tagBg: '#A7F3D0', tagColor: '#065F46', title: 'Arithmetic gradient — A/G',
            formula: 'A = G\\left[\\frac{(1+i)^N - iN - 1}{i[(1+i)^N - 1]}\\right] = G(A/G,\\,i,\\,N)', formulaDisplay: true,
            notes: 'Add this A to any base uniform series A₁.'
          },
          { id: cid(), order: 2, tag: 'Geometric', tagBg: '#A7F3D0', tagColor: '#065F46', title: 'Geometric gradient',
            subs: [
              { latex: 'i^o = \\frac{1+i}{1+g} - 1' },
              { latex: '(P/A,g,i,N) = \\frac{(P/A,i^o,N)}{1+g}' },
            ],
            notes: 'g > i: i° < 0, must use formula. g = i: P = N·A₁/(1+g).'
          },
        ]
      },
      {
        id: sid(), label: 'Depreciation', cat: 'deprec', order: 3,
        cards: [
          { id: cid(), order: 0, tag: 'SL', tagBg: '#FEF3C7', tagColor: '#92400E', title: 'Straight-line depreciation',
            subs: [
              { latex: 'D_{SL}(n) = (P - S)/N' },
              { latex: 'BV_{SL}(n) = P - n(P-S)/N' },
            ],
            notes: 'P = first cost, S = salvage, N = depreciable life.'
          },
          { id: cid(), order: 1, tag: 'DB', tagBg: '#FEF3C7', tagColor: '#92400E', title: 'Declining balance depreciation',
            subs: [
              { latex: 'BV_{DB}(n) = P(1-d)^n' },
              { latex: 'D_{DB}(n) = BV_{DB}(n-1)\\cdot d' },
            ],
            notes: 'DDB: d = 2/N. Exact match to S: d = 1 − (S/P)^(1/N).'
          },
        ]
      },
      {
        id: sid(), label: 'Inflation', cat: 'inflation', order: 4,
        cards: [
          { id: cid(), order: 0, tag: 'Inflation', tagBg: '#FEE2E2', tagColor: '#7F1D1D', title: 'Combined MARR with inflation',
            subs: [
              { latex: 'i = i\' + f + i\'f' },
              { latex: 'MARR_A = MARR_c + f + MARR_c \\cdot f' },
            ],
            notes: 'i = combined rate, i\' = real rate, f = inflation rate. Never mix actual and constant dollar cash flows.'
          },
        ]
      },
      {
        id: sid(), label: 'Project Analysis — PW, AW, IRR', cat: 'analysis', order: 5,
        cards: [
          { id: cid(), order: 0, tag: 'PW', tagBg: '#EDE9FE', tagColor: '#4C1D95', title: 'Present worth analysis',
            notes: '<strong>Decision rule:</strong> PW ≥ 0 → accept. Choose highest PW for mutually exclusive alternatives. Use LCM of lives or specified study period.'
          },
          { id: cid(), order: 1, tag: 'Levelized Cost', tagBg: '#EDE9FE', tagColor: '#4C1D95', title: 'Levelized (break-even) cost',
            formula: 'x = \\frac{PW_{\\text{costs}} - PW_{\\text{salvage}}}{PW_{\\text{output}}}', formulaDisplay: true,
            notes: 'Break-even unit price. Used in energy (LCOE).'
          },
          { id: cid(), order: 2, tag: 'Payback', tagBg: '#EDE9FE', tagColor: '#4C1D95', title: 'Payback period',
            formula: '\\text{Payback} = \\frac{\\text{First Cost}}{\\text{Annual Savings}}', formulaDisplay: true,
            notes: 'Simple payback ignores time value. Screening tool only.'
          },
        ]
      },
      {
        id: sid(), label: 'Financial Ratios', cat: 'financial', order: 6,
        cards: [
          { id: cid(), order: 0, tag: 'Liquidity', tagBg: '#E0F2FE', tagColor: '#0C4A6E', title: 'Liquidity ratios',
            subs: [
              { latex: '\\text{Current Ratio} = \\text{Current Assets}/\\text{Current Liabilities}' },
              { latex: '\\text{Acid Test} = \\text{Quick Assets}/\\text{Current Liabilities}' },
            ],
            notes: 'Quick Assets = Current Assets − Inventories.'
          },
          { id: cid(), order: 1, tag: 'Profitability', tagBg: '#E0F2FE', tagColor: '#0C4A6E', title: 'Profitability ratios',
            subs: [
              { latex: '\\text{ROA} = \\text{Net Income}/\\text{Total Assets}' },
              { latex: '\\text{ROE} = \\text{Net Income}/\\text{Total Equity}' },
              { latex: '\\text{Equity Ratio} = \\text{Total Equity}/\\text{Total Assets}' },
            ]
          },
        ]
      },
      {
        id: sid(), label: 'Benefit-Cost Analysis', cat: 'bcr', order: 7,
        cards: [
          { id: cid(), order: 0, tag: 'BCR', tagBg: '#F0FDF4', tagColor: '#166534', title: 'Benefit-cost ratios',
            subs: [
              { latex: 'BCR = \\dfrac{PW(\\text{benefits})}{PW(\\text{costs})}' },
              { latex: 'BCR_M = \\dfrac{PW(\\text{benefits}) - PW(\\text{op. costs})}{PW(\\text{capital costs})}' },
            ],
            notes: 'BCR ≥ 1 → accept.'
          },
          { id: cid(), order: 1, tag: 'BCR', tagBg: '#F0FDF4', tagColor: '#166534', title: 'Incremental BCR',
            formula: 'BCR(X-Y) = \\frac{B_X - B_Y}{C_X - C_Y}', formulaDisplay: true,
            notes: 'Order by increasing cost. BCR(X−Y) ≥ 1 → choose X. Never choose by highest BCR alone.'
          },
        ]
      },
      {
        id: sid(), label: 'Interest Factor Tables', cat: 'tables', order: 8,
        cards: [
          { id: cid(), order: 0, type: 'widget', tag: 'Tables', tagBg: '#ECFDF5', tagColor: '#065F46',
            title: 'Discrete Compounding Interest Factors — select rate & period' },
        ]
      },
    ]
  },
]
