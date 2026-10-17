import type { PracticeLab } from '@/types'

/* Generated from the AER309 Term Test 1 practice booklets in the Aerospace Semester 3 repo (LaTeX converted to
   Markdown with $…$ / $$…$$ KaTeX math, rendered by renderMarkdown in src/lib/markdown.ts).
   Figures are the booklets' TikZ drawings, exported to SVG under public/practice/. */

export const AER309_PRACTICE: PracticeLab[] = [
  {
    id: 'aer309-t1-a',
    number: 1,
    heading: 'Test 1 practice A',
    short: 'A',
    title: "Pistons, shaft work, conduction, polytropic, throttling, compressor",
    ref: 'Ch. 1–5',
    blurb: String.raw`Six questions, 100 marks, about 80 minutes, closed book with a calculator and a one-page sheet. Covers a piston force balance with a barometer, shaft work with a two-body energy balance, conduction and radiation, a polytropic process with heat transfer, a throttling valve with R-134a (needs Table A-12), and a compressor with an aftercooler. Answers to four significant figures; $Q > 0$ in, $W > 0$ out.`,
    intro: String.raw`**Every question.** Name the system (closed or control volume), list the assumptions (steady, ideal gas, adiabatic, $\Delta KE$ and $\Delta PE$ negligible), sketch it, fix each state from the tables or the ideal-gas law, write the mass balance and then the energy balance, and carry units to a circled answer.

**Ch. 1: pressure and temperature.** Use absolute values only: $P_{abs} = P_{atm} + P_{gage} = P_{atm} - P_{vac}$ and $T(\mathrm{K}) = T(^\circ\mathrm{C}) + 273.15$.

| Tool | Rule |
|---|---|
| hydrostatics | $\Delta P = \rho g \Delta z$, $P = P_{atm} + \rho g h$ |
| manometer walk | going down add $\rho g h$, going up subtract it; same level in the same fluid means same $P$ |
| barometer | $P_{atm} = \rho_{Hg}\, g\, h$, $1\ \mathrm{atm} = 101.325\ \mathrm{kPa} = 760\ \mathrm{mmHg}$ |
| unit bridges | $1\ \mathrm{kPa\cdot m^3} = 1\ \mathrm{kJ}$, $1\ \mathrm{kJ/kg} = 1000\ \mathrm{m^2/s^2}$, $1\ \mathrm{L} = 0.001\ \mathrm{m^3}$ |

**Ch. 2: energy, work, heat.** $e = u + V^2/2 + gz$. Signs: $Q > 0$ in, $W > 0$ out; heat is driven by $\Delta T$, everything else crossing the boundary is work.

| Which work? | Formula |
|---|---|
| boundary | $W_b = \int P\,d\mathcal{V}$; constant $P$: $P(\mathcal{V}_2 - \mathcal{V}_1)$; constant $\mathcal{V}$: 0 |
| polytropic $P\mathcal{V}^n = C$ | $W_b = \dfrac{P_2\mathcal{V}_2 - P_1\mathcal{V}_1}{1 - n}$; $n = 1$: $P_1\mathcal{V}_1\ln(\mathcal{V}_2/\mathcal{V}_1)$ |
| shaft, electrical | $W_{sh} = 2\pi n T$, $W_e = V I \Delta t$ |
| pump | $\eta = \Delta\dot{E}_{mech}/\dot{W}_{elect}$, $\Delta P = \Delta\dot{E}_{mech}/\dot{\mathcal{V}}$ |
| heat rates | $kA\dfrac{T_1 - T_2}{L}$, $hA(T_s - T_\infty)$, $\varepsilon\sigma A(T_s^4 - T_{surr}^4)$ with $T$ in K |

**Ch. 3: properties.** Water or refrigerant: compare with the saturation values at the given $P$ or $T$. Compressed liquid if $T < T_{sat}(P)$ ($y \approx y_f(T)$); saturated mixture if $v_f < v < v_g$ ($x = (v - v_f)/v_{fg}$, $y = y_f + x\,y_{fg}$); superheated if $T > T_{sat}(P)$ or $v > v_g$ (Table A-6, interpolate). Ideal gas: $Pv = RT$, $R = R_u/M$, $c_p - c_v = R$, $h = u + RT$. For $\Delta u$, $\Delta h$ use Table A-17 if given, otherwise $c_v\Delta T$, $c_p\Delta T$ (air: $R = 0.2870$, $c_p = 1.005$, $c_v = 0.718\ \mathrm{kJ/(kg\cdot K)}$, $k = 1.4$). Liquids and solids: $\Delta u = c\Delta T$, $\Delta h = c\Delta T + v\Delta P$.

**Ch. 4: closed systems.** $Q - W = \Delta U + \Delta KE + \Delta PE$ with $W = W_b + W_{other}$.

| Process | Result |
|---|---|
| constant volume | $W_b = 0$, $Q - W_{other} = \Delta U$ |
| constant pressure | $Q - W_{other} = \Delta H$ |
| isothermal ideal gas | $\Delta U = 0$, $Q = W$ |
| adiabatic | $Q = 0$, $-W = \Delta U$ |
| insulated, several bodies | $\sum m c (T_f - T_i) = 0$ |
| cycle | $\Delta U = 0$, $W_{net} = Q_{in} - Q_{out}$, $\eta_{th} = W_{net}/Q_{in}$ |

**Ch. 5: steady-flow devices.** $\dot{m} = \rho V A = VA/v$; steady: $\sum\dot{m}_{in} = \sum\dot{m}_{out}$; stream energy $\theta = h + V^2/2 + gz$.

| Device | Balance |
|---|---|
| nozzle, diffuser | $h_1 + V_1^2/2 = h_2 + V_2^2/2$ (divide $V^2/2$ by 1000 for kJ/kg) |
| turbine | $\dot{W}_{out} = \dot{m}(h_1 - h_2) - \dot{m}\,q_{out}$ |
| compressor | $\dot{W}_{in} = \dot{m}(h_2 - h_1) + \dot{m}\,q_{out}$ |
| throttle | $h_1 = h_2$ |
| mixing chamber, heat exchanger | $\sum\dot{m}h_{in} = \sum\dot{m}h_{out}$ |`,
    pdf: 'practice/aer309/test1-practice-a.pdf',
    problems: [
      {
        id: 'aer309-a-q1',
        label: 'Q1',
        method: '',
        statement: String.raw`*[10 marks]* A gas is held in a vertical, frictionless piston-cylinder device. The piston has
a mass of $5\,\mathrm{kg}$ and a cross-sectional area of
$40\,\mathrm{cm}^{2}$. A compressed spring above the piston pushes down
on it with a force of $120\,\mathrm{N}$. The space above the piston, which
holds the spring, is vented to the atmosphere. A mercury barometer in the same room
reads $740\,\mathrm{mm}$.

**(a)** Find the atmospheric pressure in kPa.

**(b)** Find the gage pressure and the absolute pressure of the gas.

**(c)** A second tank in the room has a gauge that reads
 $30\,\mathrm{kPa}$ of vacuum. Find the absolute pressure in that
 tank.`,
        solution: String.raw`**Sign convention.** Upward forces on the piston are positive.

**Given.** $m = 5\,\mathrm{kg}$, $A = 40\,\mathrm{cm}^{2} = 40\times 10^{-4}\,\mathrm{m}^{2}$, $F_{\mathrm{s}} = 120\,\mathrm{N}$ (downward),
$h_{\mathrm{Hg}} = 0.740\,\mathrm{m}$, $P_{\mathrm{vac}} = 30\,\mathrm{kPa}$.

**Find.** ($P_{\mathrm{atm}}$, $P_{\mathrm{gage}}$, $P$, $P_{\mathrm{tank}}$)

**Assumptions.** The piston is at rest and frictionless. The space that
holds the spring is open to the atmosphere.

**Analysis.** *(a) Barometer.* The mercury column is held up by the
atmosphere:

$$P_{\mathrm{atm}} = \rho_{\mathrm{Hg}}\, g\, h_{\mathrm{Hg}} = \left(13600\,\mathrm{kg}/\mathrm{m}^{3}\right) \left(9.81\,\mathrm{m}/\mathrm{s}^{2}\right) \left(0.740\,\mathrm{m}\right) = 98728\,\mathrm{Pa} = 98.728\,\mathrm{kPa} .$$

*(b) Vertical forces on the piston.* The gas pushes up. The atmosphere,
the weight and the spring push down.

$$\sum F_y = 0 = PA - P_{\mathrm{atm}}A - mg - F_{\mathrm{s}} \quad\Longrightarrow\quad P = P_{\mathrm{atm}} + \frac{mg + F_{\mathrm{s}}}{A} .$$

The second term is the gage pressure, because gage pressure is measured from
$P_{\mathrm{atm}}$:

$$\begin{aligned}P_{\mathrm{gage}} &= \frac{mg + F_{\mathrm{s}}}{A} = \frac{(5\,\mathrm{kg})(9.81\,\mathrm{m}/\mathrm{s}^{2}) + 120\,\mathrm{N}}{40\times 10^{-4}\,\mathrm{m}^{2}} = \frac{169.05\,\mathrm{N}}{40\times 10^{-4}\,\mathrm{m}^{2}} = 42263\,\mathrm{Pa} = 42.263\,\mathrm{kPa} , \\ P &= P_{\mathrm{atm}} + P_{\mathrm{gage}} = 98.728 + 42.263 = 140.99\,\mathrm{kPa} .\end{aligned}$$

*(c) Vacuum gauge.* A vacuum reading is how far the pressure sits below
atmospheric:

$$P_{\mathrm{tank}} = P_{\mathrm{atm}} - P_{\mathrm{vac}} = 98.728 - 30 = 68.728\,\mathrm{kPa} .$$

**Answer.** (a) $P_{\mathrm{atm}} = 98.73\,\mathrm{kPa}$

**(b)** $P_{\mathrm{gage}} = 42.26\,\mathrm{kPa}$, $P = 141.0\,\mathrm{kPa}$
absolute (c) $P_{\mathrm{tank}} = 68.73\,\mathrm{kPa}$ absolute

**Discussion.** The area has to be in $\mathrm{m}^{2}$ before dividing:
$40\,\mathrm{cm}^{2} = 40\times 10^{-4}\,\mathrm{m}^{2}$, not
$0.4\,\mathrm{m}^{2}$. Property tables and the ideal-gas law always take the
absolute pressure, never the gage value.`,
        figure: 'practice/aer309/a-q1.svg',
      },
      {
        id: 'aer309-a-q2',
        label: 'Q2',
        method: '',
        statement: String.raw`*[15 marks]* A well-insulated rigid tank holds $10\,\mathrm{kg}$ of liquid water at
$20{}^\circ\mathrm{C}$. A $3\,\mathrm{kg}$ copper block at $200{}^\circ\mathrm{C}$ is
dropped into the water. At the same moment a paddle wheel in the tank is switched
on. Its shaft turns at $240\,\mathrm{rpm}$ against a torque of
$5\,\mathrm{N}\cdot \mathrm{m}$ for $15\,\mathrm{min}$, and then it stops.

Take $c = 0.386\,\mathrm{kJ}/(\mathrm{kg}\cdot \mathrm{K})$ for copper.

**(a)** Find the shaft work done on the contents of the tank.

**(b)** Find the final equilibrium temperature.`,
        solution: "**Sign convention.** $Q > 0$ into the system, $W > 0$ out of the system. The\npaddle does work on the system, so $W = -W_{\\mathrm{sh,in}}$.\n\n**Given.** $m_{\\mathrm{w}} = 10\\,\\mathrm{kg}$, $T_{\\mathrm{w}} = 20{}^\\circ\\mathrm{C}$,\n$m_{\\mathrm{c}} = 3\\,\\mathrm{kg}$, $T_{\\mathrm{c}} = 200{}^\\circ\\mathrm{C}$,\n$c_{\\mathrm{w}} = 4.18\\,\\mathrm{kJ}/(\\mathrm{kg}\\cdot \\mathrm{K})$,\n$c_{\\mathrm{c}} = 0.386\\,\\mathrm{kJ}/(\\mathrm{kg}\\cdot \\mathrm{K})$,\n$\\dot{n} = 240\\,\\mathrm{rpm}$, $\\tau = 5\\,\\mathrm{N}\\cdot \\mathrm{m}$,\n$\\Delta t = 15\\,\\mathrm{min}$.\n\n**Find.** ($W_{\\mathrm{sh,in}}$, $T_{\\mathrm{f}}$)\n\n**Strategy.** Take the water and the copper together as one closed system.\nThen the heat that passes between them is internal and drops out of the balance.\n\n**Assumptions.** The tank is insulated, so $Q = 0$. It is rigid, so there is\nno boundary work. Water and copper are incompressible with constant specific\nheats. The water stays liquid. Kinetic and potential energy changes are zero.\n\n**Analysis.** *(a) Shaft work.* The shaft speed in revolutions per\nsecond is $\\dot{n} = 240/60 = 4\\,1/\\mathrm{s}$, and\n$\\Delta t = 900\\,\\mathrm{s}$.\n\n$$W_{\\mathrm{sh,in}} = 2\\pi\\,\\dot{n}\\,\\tau\\,\\Delta t = 2\\pi\\left(4\\,1/\\mathrm{s}\\right)\\left(5\\,\\mathrm{N}\\cdot \\mathrm{m}\\right) \\left(900\\,\\mathrm{s}\\right) = 113097\\,\\mathrm{J} = 113.10\\,\\mathrm{kJ} .$$\n\n*(b) Energy balance on water plus copper.*\n\n$$Q - W = \\Delta U \\quad\\Longrightarrow\\quad 0 + W_{\\mathrm{sh,in}} = m_{\\mathrm{w}} c_{\\mathrm{w}}\\left(T_{\\mathrm{f}} - T_{\\mathrm{w}}\\right) + m_{\\mathrm{c}} c_{\\mathrm{c}}\\left(T_{\\mathrm{f}} - T_{\\mathrm{c}}\\right) .$$\n\nSolving for the final temperature,\n\n$$T_{\\mathrm{f}} = \\frac{W_{\\mathrm{sh,in}} + m_{\\mathrm{w}} c_{\\mathrm{w}} T_{\\mathrm{w}} + m_{\\mathrm{c}} c_{\\mathrm{c}} T_{\\mathrm{c}}} {m_{\\mathrm{w}} c_{\\mathrm{w}} + m_{\\mathrm{c}} c_{\\mathrm{c}}} .$$\n\nThe two heat capacities are\n$m_{\\mathrm{w}} c_{\\mathrm{w}} = (10)(4.18) = 41.8\\,\\mathrm{kJ}/\\mathrm{K}$ and\n$m_{\\mathrm{c}} c_{\\mathrm{c}} = (3)(0.386) = 1.158\\,\\mathrm{kJ}/\\mathrm{K}$. Then\n\n$$T_{\\mathrm{f}} = \\frac{113.10 + (41.8)(20) + (1.158)(200)}{41.8 + 1.158} = \\frac{1180.70\\,\\mathrm{kJ}}{42.958\\,\\mathrm{kJ}/\\mathrm{K}} = 27.48{}^\\circ\\mathrm{C} .$$\n\nTemperatures can stay in ${}^\\circ\\mathrm{C}$ here because only temperature\ndifferences appear in the balance.\n\n**Answer.** (a) $W_{\\mathrm{sh,in}} = 113.1\\,\\mathrm{kJ}$, done on the water\n\n**(b)** $T_{\\mathrm{f}} = 27.48{}^\\circ\\mathrm{C}$\n\n**Check.** The water gains $(41.8)(27.485 - 20) = 312.9\\,\\mathrm{kJ}$.\nThe copper loses $(1.158)(200 - 27.485) = 199.8\\,\\mathrm{kJ}$. The\ndifference is $113.1\\,\\mathrm{kJ}$, which is the shaft work. Without the\npaddle the final temperature would be only $24.85{}^\\circ\\mathrm{C}$. The assumption\nthat the water stays liquid holds, since $27.48{}^\\circ\\mathrm{C}$ is far below\nboiling.",
        figure: 'practice/aer309/a-q2.svg',
      },
      {
        id: 'aer309-a-q3',
        label: 'Q3',
        method: '',
        statement: String.raw`*[15 marks]* A brick wall is $4\,\mathrm{m}$ high, $6\,\mathrm{m}$ wide and $30\,\mathrm{cm}$
thick, with a thermal conductivity of
$0.69\,\mathrm{W}/(\mathrm{m}\cdot \mathrm{K})$. On a winter night its inner surface is at
$20{}^\circ\mathrm{C}$ and its outer surface is at $5{}^\circ\mathrm{C}$, and conditions
are steady. The outer surface has an emissivity of 0.9. The outdoor air and the
surrounding surfaces are both at $0{}^\circ\mathrm{C}$.

**(a)** Find the rate of heat conduction through the wall.

**(b)** Find the rate at which the outer surface loses heat by radiation.

**(c)** Find the convection heat transfer coefficient on the outer surface.`,
        solution: "**Sign convention.** Heat flow from the inside to the outside is positive.\n\n**Given.** $A = (4)(6) = 24\\,\\mathrm{m}^{2}$, $L = 0.30\\,\\mathrm{m}$,\n$k = 0.69\\,\\mathrm{W}/(\\mathrm{m}\\cdot \\mathrm{K})$, $T_1 = 20{}^\\circ\\mathrm{C}$,\n$T_{\\mathrm{s}} = 5{}^\\circ\\mathrm{C}$, $\\varepsilon = 0.9$,\n$T_\\infty = T_{\\mathrm{surr}} = 0{}^\\circ\\mathrm{C}$.\n\n**Find.** ($\\dot{Q}_{\\mathrm{cond}}$, $\\dot{Q}_{\\mathrm{rad}}$, $h$)\n\n**Strategy.** At steady state the outer surface stores no energy. Whatever\narrives by conduction has to leave by radiation plus convection.\n\n**Assumptions.** Steady state. One-dimensional conduction with constant $k$.\nUniform surface temperatures.\n\n**Analysis.** *(a) Conduction.*\n\n$$\\dot{Q}_{\\mathrm{cond}} = kA\\,\\frac{T_1 - T_{\\mathrm{s}}}{L} = \\left(0.69\\,\\mathrm{W}/(\\mathrm{m}\\cdot \\mathrm{K})\\right) \\left(24\\,\\mathrm{m}^{2}\\right) \\frac{(20 - 5)\\,\\mathrm{K}}{0.30\\,\\mathrm{m}} = 828.0\\,\\mathrm{W} .$$\n\nA difference of $15{}^\\circ\\mathrm{C}$ is a difference of $15\\,\\mathrm{K}$, so no\nconversion is needed here.\n\n*(b) Radiation.* This one needs absolute temperatures:\n$T_{\\mathrm{s}} = 278.15\\,\\mathrm{K}$ and $T_{\\mathrm{surr}} = 273.15\\,\\mathrm{K}$.\n\n$$\\begin{aligned}\\dot{Q}_{\\mathrm{rad}} &= \\varepsilon\\sigma A\\left(T_{\\mathrm{s}}^4 - T_{\\mathrm{surr}}^4\\right) \\\\ &= (0.9)\\left(5.67\\times 10^{-8}\\,\\mathrm{W}/(\\mathrm{m}^{2}\\cdot \\mathrm{K}^{4})\\right) \\left(24\\,\\mathrm{m}^{2}\\right) \\left(278.15^4 - 273.15^4\\right)\\mathrm{K}^{4} \\\\ &= \\left(1.2247\\times 10^{-6}\\,\\mathrm{W}/\\mathrm{K}^{4}\\right) \\left(5.9857 \\times 10^{9} - 5.5668 \\times 10^{9}\\right)\\mathrm{K}^{4} = 513.07\\,\\mathrm{W} .\\end{aligned}$$\n\n*(c) Energy balance on the outer surface.*\n\n$$\\dot{Q}_{\\mathrm{cond}} = \\dot{Q}_{\\mathrm{rad}} + \\dot{Q}_{\\mathrm{conv}} \\quad\\Longrightarrow\\quad \\dot{Q}_{\\mathrm{conv}} = 828.0 - 513.07 = 314.93\\,\\mathrm{W} .$$\n\nThen, from $\\dot{Q}_{\\mathrm{conv}} = hA\\left(T_{\\mathrm{s}} - T_\\infty\\right)$,\n\n$$h = \\frac{\\dot{Q}_{\\mathrm{conv}}}{A\\left(T_{\\mathrm{s}} - T_\\infty\\right)} = \\frac{314.93\\,\\mathrm{W}}{(24\\,\\mathrm{m}^{2})(5\\,\\mathrm{K})} = 2.624\\,\\mathrm{W}/(\\mathrm{m}^{2}\\cdot \\mathrm{K}) .$$\n\n**Answer.** (a) $\\dot{Q}_{\\mathrm{cond}} = 828.0\\,\\mathrm{W}$\n\n**(b)** $\\dot{Q}_{\\mathrm{rad}} = 513.1\\,\\mathrm{W}$\n\n**(c)** $h = 2.624\\,\\mathrm{W}/(\\mathrm{m}^{2}\\cdot \\mathrm{K})$\n\n**Discussion.** Putting ${}^\\circ\\mathrm{C}$ into the radiation formula gives\n$5^4 - 0^4 = 625$ and a heat loss of under a milliwatt, which is the usual way\nto lose marks here. Radiation carries $62%$ of the loss even though\nthe surface is only $5\\,\\mathrm{K}$ warmer than its surroundings. The small $h$\nis typical of still air.",
        figure: 'practice/aer309/a-q3.svg',
      },
      {
        id: 'aer309-a-q4',
        label: 'Q4',
        method: '',
        statement: String.raw`*[20 marks]* A piston-cylinder device contains $0.5\,\mathrm{kg}$ of air at
$100\,\mathrm{kPa}$ and $300\,\mathrm{K}$. The air is compressed slowly to
$800\,\mathrm{kPa}$ in a polytropic process with $n = 1.3$. Treat air as an
ideal gas with constant specific heats.

**(a)** Find the final temperature and the initial and final volumes.

**(b)** Find the boundary work, and say whether it is done on or by the air.

**(c)** Find the heat transfer, and say whether it is into or out of the air.

**(d)** Sketch the process on a $P$-$V$ diagram. On the same axes, show where an
 isothermal compression and an adiabatic ($n = k = 1.4$) compression
 from the same initial state would end up.`,
        solution: String.raw`**Sign convention.** $Q > 0$ into the air, $W > 0$ done by the air.

**Given.** $m = 0.5\,\mathrm{kg}$, $P_1 = 100\,\mathrm{kPa}$,
$T_1 = 300\,\mathrm{K}$, $P_2 = 800\,\mathrm{kPa}$, $n = 1.3$,
$R = 0.287\,\mathrm{kJ}/(\mathrm{kg}\cdot \mathrm{K})$,
$c_v = 0.718\,\mathrm{kJ}/(\mathrm{kg}\cdot \mathrm{K})$.

**Find.** ($T_2$, $V_1$, $V_2$, $W_{\mathrm{b}}$, $Q$)

**Assumptions.** Closed system: the air in the cylinder. Ideal gas with
constant specific heats. Quasi-equilibrium process with $PV^n = \text{constant}$.
Kinetic and potential energy changes are zero.

**Analysis.** *(a) End states.* For a polytropic process of an ideal
gas,

$$T_2 = T_1\left(\frac{P_2}{P_1}\right)^{(n-1)/n} = \left(300\,\mathrm{K}\right)\left(\frac{800}{100}\right)^{0.3/1.3} = \left(300\,\mathrm{K}\right)(8)^{0.23077} = 484.76\,\mathrm{K} .$$

The volumes follow from $PV = mRT$, using
$1\,\mathrm{kJ} = 1\,\mathrm{kPa}\cdot \mathrm{m}^{3}$:

$$\begin{aligned}V_1 &= \frac{mRT_1}{P_1} = \frac{(0.5\,\mathrm{kg})(0.287\,\mathrm{kJ}/(\mathrm{kg}\cdot \mathrm{K})) (300\,\mathrm{K})}{100\,\mathrm{kPa}} = 0.4305\,\mathrm{m}^{3} , \\ V_2 &= \frac{mRT_2}{P_2} = \frac{(0.5)(0.287)(484.76)}{800}\,\mathrm{m}^{3} = 0.08695\,\mathrm{m}^{3} .\end{aligned}$$

*(b) Boundary work.* With $P = CV^{-n}$,

$$W_{\mathrm{b}} = \int_1^2 P \mathrm{d} V = \frac{P_2V_2 - P_1V_1}{1 - n} = \frac{mR\left(T_2 - T_1\right)}{1 - n} .$$

$$W_{\mathrm{b}} = \frac{(0.5\,\mathrm{kg})(0.287\,\mathrm{kJ}/(\mathrm{kg}\cdot \mathrm{K})) (484.76 - 300)\,\mathrm{K}}{1 - 1.3} = \frac{26.513\,\mathrm{kJ}}{-0.3} = -88.38\,\mathrm{kJ} .$$

The sign is negative, so the work is done on the air.

*(c) Energy balance.*

$$Q - W_{\mathrm{b}} = \Delta U \quad\Longrightarrow\quad Q = m c_v\left(T_2 - T_1\right) + W_{\mathrm{b}} .$$

$$\begin{aligned}\Delta U &= (0.5\,\mathrm{kg})(0.718\,\mathrm{kJ}/(\mathrm{kg}\cdot \mathrm{K})) (184.76\,\mathrm{K}) = 66.33\,\mathrm{kJ} , \\ Q &= 66.33 + (-88.38) = -22.05\,\mathrm{kJ} .\end{aligned}$$

The sign is negative, so the heat leaves the air.

**Answer.** (a) $T_2 = 484.8\,\mathrm{K}$, $V_1 = 0.4305\,\mathrm{m}^{3}$,
$V_2 = 0.08695\,\mathrm{m}^{3}$

**(b)** $88.38\,\mathrm{kJ}$ of work done on the air

**(c)** $22.05\,\mathrm{kJ}$ of heat out of the air

**Discussion.** Of the $88.38\,\mathrm{kJ}$ of work put in,
$66.33\,\mathrm{kJ}$ stays in the air as internal energy and
$22.05\,\mathrm{kJ}$ leaves as heat. That fits $n = 1.3$, which lies between
isothermal ($n = 1$, all the work leaves as heat) and adiabatic ($n = 1.4$, none
of it does). The diagram is on the next page.

**$P$-$V$ diagram for Question 4** (drawn to scale)

The process runs from state 1 up and to the left. All three curves start at
state 1 and stop at $800\,\mathrm{kPa}$. The larger the exponent, the steeper
the curve, so the adiabatic path reaches $800\,\mathrm{kPa}$ at the largest
volume ($0.0975\,\mathrm{m}^{3}$) and the isothermal path at the smallest
($0.0538\,\mathrm{m}^{3}$). The area under the $n = 1.3$ curve, down to the
$V$ axis, is the $88.38\,\mathrm{kJ}$ of boundary work.`,
        figure: 'practice/aer309/a-q4.svg',
        solutionFigure: 'practice/aer309/a-s4.svg',
      },
      {
        id: 'aer309-a-q5',
        label: 'Q5',
        method: '',
        statement: String.raw`*[20 marks]* Refrigerant-134a enters the throttling valve of a refrigerator as saturated
liquid at $800\,\mathrm{kPa}$ and leaves at $140\,\mathrm{kPa}$. The inlet
tube has an inside diameter of $12\,\mathrm{mm}$ and the liquid moves
through it at $0.9\,\mathrm{m}/\mathrm{s}$. The valve is well insulated.

**(a)** Find the mass flow rate.

**(b)** Find the quality of the refrigerant at the exit.

**(c)** Find the temperature change across the valve.

**(d)** Find the exit tube diameter that keeps the exit velocity at
 $5\,\mathrm{m}/\mathrm{s}$.`,
        solution: "**Sign convention.** $Q > 0$ into the control volume, $W > 0$ out of it. In\nthis question and the next, $V$ is velocity and $\\dot{V}$ is volume flow rate.\n\n**Given.** State 1: saturated liquid, $P_1 = 800\\,\\mathrm{kPa}$,\n$D_1 = 0.012\\,\\mathrm{m}$, $V_1 = 0.9\\,\\mathrm{m}/\\mathrm{s}$. State 2:\n$P_2 = 140\\,\\mathrm{kPa}$, $V_2 = 5\\,\\mathrm{m}/\\mathrm{s}$.\n\n**Find.** ($\\dot{m}$, $x_2$, $T_2 - T_1$, $D_2$)\n\n**Assumptions.** Control volume: the valve, one inlet and one exit. Steady\nflow. Adiabatic, and a valve has no shaft, so $\\dot{Q} = \\dot{W} = 0$. Kinetic\nand potential energy changes are negligible (checked at the end).\n\n**Properties.** From Table A-12:\n\n| {$P$ ($\\mathrm{kPa}$)} | {$T_{\\mathrm{sat}}$ (${}^\\circ\\mathrm{C}$)} | {$v_{\\mathrm{f}}$ ($\\mathrm{m}^{3}/\\mathrm{kg}$)} | {$v_{\\mathrm{g}}$ ($\\mathrm{m}^{3}/\\mathrm{kg}$)} | {$h_{\\mathrm{f}}$ ($\\mathrm{kJ}/\\mathrm{kg}$)} | {$h_{\\mathrm{fg}}$ ($\\mathrm{kJ}/\\mathrm{kg}$)} | {$h_{\\mathrm{g}}$ ($\\mathrm{kJ}/\\mathrm{kg}$)} |\n|---|---|---|---|---|---|---|\n| 800 | 31.31 | 0.0008457 | 0.025645 | 95.48 | 171.86 | 267.34 |\n| 140 | -18.77 | 0.0007381 | 0.14020 | 27.06 | 212.13 | 239.19 |\n\nState 1 is saturated liquid, so $v_1 = v_{\\mathrm{f}} = 0.0008457\\,\\mathrm{m}^{3}/\\mathrm{kg}$,\n$h_1 = h_{\\mathrm{f}} = 95.48\\,\\mathrm{kJ}/\\mathrm{kg}$ and\n$T_1 = 31.31{}^\\circ\\mathrm{C}$.\n\n**Analysis.** *(a) Mass balance.*\n\n$$A_1 = \\frac{\\pi D_1^2}{4} = \\frac{\\pi(0.012\\,\\mathrm{m})^2}{4} = 1.1310\\times 10^{-4}\\,\\mathrm{m}^{2} ,$$\n\n$$\\dot{m} = \\frac{V_1 A_1}{v_1} = \\frac{(0.9\\,\\mathrm{m}/\\mathrm{s})(1.1310\\times 10^{-4}\\,\\mathrm{m}^{2})} {0.0008457\\,\\mathrm{m}^{3}/\\mathrm{kg}} = 0.12036\\,\\mathrm{kg}/\\mathrm{s} .$$\n\n*(b) Energy balance.* With no heat, no work and negligible kinetic and\npotential energy, the steady-flow balance reduces to\n\n$$h_2 = h_1 = 95.48\\,\\mathrm{kJ}/\\mathrm{kg} .$$\n\nAt $140\\,\\mathrm{kPa}$, $h_{\\mathrm{f}} < h_2 < h_{\\mathrm{g}}$\n($27.06 < 95.48 < 239.19$), so the exit is a saturated mixture with\n\n$$x_2 = \\frac{h_2 - h_{\\mathrm{f}}}{h_{\\mathrm{fg}}} = \\frac{95.48 - 27.06}{212.13} = 0.32254 .$$\n\n*(c) Temperature change.* A saturated mixture sits at the saturation\ntemperature for its pressure, so $T_2 = -18.77{}^\\circ\\mathrm{C}$ and\n\n$$T_2 - T_1 = -18.77 - 31.31 = -50.08{}^\\circ\\mathrm{C} .$$\n\n*(d) Exit tube.* The exit specific volume is\n\n$$v_2 = v_{\\mathrm{f}} + x_2\\left(v_{\\mathrm{g}} - v_{\\mathrm{f}}\\right) = 0.0007381 + (0.32254)(0.14020 - 0.0007381) = 0.045720\\,\\mathrm{m}^{3}/\\mathrm{kg} .$$\n\nThe mass flow rate is the same at the exit, so\n$\\dot{m} = V_2 A_2 / v_2$ and\n\n$$A_2 = \\frac{\\dot{m} v_2}{V_2} = \\frac{(0.12036\\,\\mathrm{kg}/\\mathrm{s})(0.045720\\,\\mathrm{m}^{3}/\\mathrm{kg})} {5\\,\\mathrm{m}/\\mathrm{s}} = 1.1006\\times 10^{-3}\\,\\mathrm{m}^{2} ,$$\n\n$$D_2 = \\sqrt{\\frac{4A_2}{\\pi}} = 0.03743\\,\\mathrm{m} .$$\n\n**Answer.** (a) $\\dot{m} = 0.1204\\,\\mathrm{kg}/\\mathrm{s}$\n\n**(b)** $x_2 = 0.3225$\n\n**(c)** the temperature drops by $50.08{}^\\circ\\mathrm{C}$, from $31.31{}^\\circ\\mathrm{C}$ to\n$-18.77{}^\\circ\\mathrm{C}$\n\n**(d)** $D_2 = 37.43\\,\\mathrm{mm}$\n\n**Check.** The exit kinetic energy is\n$V_2^2/2 = 25/2 = 12.5\\,\\mathrm{J}/\\mathrm{kg} = 0.0125\\,\\mathrm{kJ}/\\mathrm{kg}$,\nwhich is nothing next to $h = 95.48\\,\\mathrm{kJ}/\\mathrm{kg}$, so leaving\nit out was fair. The specific volume grows by a factor of 54 across the valve,\nwhich is why the exit tube has to be about three times wider. In the same\n$12\\,\\mathrm{mm}$ tube the exit velocity would be\n$48.65\\,\\mathrm{m}/\\mathrm{s}$.",
        figure: 'practice/aer309/a-q5.svg',
      },
      {
        id: 'aer309-a-q6',
        label: 'Q6',
        method: '',
        statement: String.raw`*[20 marks]* Air enters a compressor at $100\,\mathrm{kPa}$ and $300\,\mathrm{K}$ with a
volume flow rate of $1.2\,\mathrm{m}^{3}/\mathrm{s}$. It leaves at
$800\,\mathrm{kPa}$ and $550\,\mathrm{K}$. The compressor casing loses
$20\,\mathrm{kJ}$ of heat to the room for every kilogram of air that passes
through. The hot air then goes through an aftercooler, a heat exchanger in which
cooling water brings the air down to $320\,\mathrm{K}$ at constant pressure. The
water enters at $15{}^\circ\mathrm{C}$ and leaves at $35{}^\circ\mathrm{C}$. The
aftercooler is insulated on the outside. Use constant specific heats and neglect
kinetic and potential energy changes.

**(a)** Find the mass flow rate of air.

**(b)** Find the power input to the compressor.

**(c)** Find the mass flow rate of cooling water.`,
        solution: String.raw`**Sign convention.** Each term is written as a positive quantity with its
direction in the subscript ($\dot{W}_{\mathrm{in}}$, $\dot{Q}_{\mathrm{out}}$), and the
balance is written as energy in equals energy out.

**Given.** $P_1 = 100\,\mathrm{kPa}$, $T_1 = 300\,\mathrm{K}$,
$\dot{V}_1 = 1.2\,\mathrm{m}^{3}/\mathrm{s}$, $P_2 = 800\,\mathrm{kPa}$,
$T_2 = 550\,\mathrm{K}$, $q_{\mathrm{out}} = 20\,\mathrm{kJ}/\mathrm{kg}$,
$T_3 = 320\,\mathrm{K}$, $T_{\mathrm{w,in}} = 15{}^\circ\mathrm{C}$,
$T_{\mathrm{w,out}} = 35{}^\circ\mathrm{C}$.

**Find.** ($\dot{m}_{\mathrm{a}}$, $\dot{W}_{\mathrm{in}}$, $\dot{m}_{\mathrm{w}}$)

**Assumptions.** Steady flow in both devices. Air is an ideal gas with
constant $c_p$, so $\Delta h = c_p\,\Delta T$. Water is incompressible and its
pressure drop is negligible, so $\Delta h = c\,\Delta T$. Kinetic and potential
energy changes are negligible. The aftercooler exchanges no heat with the room
and has no work.

**Analysis.** *(a) Mass flow rate of air.* The ideal-gas law gives the
inlet specific volume:

$$v_1 = \frac{RT_1}{P_1} = \frac{(0.287\,\mathrm{kJ}/(\mathrm{kg}\cdot \mathrm{K}))(300\,\mathrm{K})} {100\,\mathrm{kPa}} = 0.8610\,\mathrm{m}^{3}/\mathrm{kg} ,$$

$$\dot{m}_{\mathrm{a}} = \frac{\dot{V}_1}{v_1} = \frac{1.2\,\mathrm{m}^{3}/\mathrm{s}}{0.8610\,\mathrm{m}^{3}/\mathrm{kg}} = 1.3937\,\mathrm{kg}/\mathrm{s} .$$

*(b) Compressor.* Control volume: the compressor. Energy in equals
energy out:

$$\dot{W}_{\mathrm{in}} + \dot{m}_{\mathrm{a}} h_1 = \dot{Q}_{\mathrm{out}} + \dot{m}_{\mathrm{a}} h_2 \quad\Longrightarrow\quad \dot{W}_{\mathrm{in}} = \dot{m}_{\mathrm{a}}\left[c_p\left(T_2 - T_1\right) + q_{\mathrm{out}}\right] .$$

The work per unit mass is

$$w_{\mathrm{in}} = (1.005\,\mathrm{kJ}/(\mathrm{kg}\cdot \mathrm{K}))(550 - 300)\,\mathrm{K} + 20\,\mathrm{kJ}/\mathrm{kg} = 251.25 + 20 = 271.25\,\mathrm{kJ}/\mathrm{kg} ,$$

so

$$\dot{W}_{\mathrm{in}} = (1.3937\,\mathrm{kg}/\mathrm{s})(271.25\,\mathrm{kJ}/\mathrm{kg}) = 378.0\,\mathrm{kW} .$$

*(c) Aftercooler.* Control volume: the whole heat exchanger, with both
streams inside it. Nothing crosses that boundary as heat or work, so

$$\dot{m}_{\mathrm{a}} h_2 + \dot{m}_{\mathrm{w}} h_{\mathrm{w,in}} = \dot{m}_{\mathrm{a}} h_3 + \dot{m}_{\mathrm{w}} h_{\mathrm{w,out}} \quad\Longrightarrow\quad \dot{m}_{\mathrm{w}} = \frac{\dot{m}_{\mathrm{a}} c_p\left(T_2 - T_3\right)} {c_{\mathrm{w}}\left(T_{\mathrm{w,out}} - T_{\mathrm{w,in}}\right)} .$$

The heat given up by the air is

$$\dot{m}_{\mathrm{a}} c_p\left(T_2 - T_3\right) = (1.3937)(1.005)(550 - 320) = 322.16\,\mathrm{kW} ,$$

and then

$$\dot{m}_{\mathrm{w}} = \frac{322.16\,\mathrm{kW}} {(4.18\,\mathrm{kJ}/(\mathrm{kg}\cdot \mathrm{K}))(35 - 15)\,\mathrm{K}} = 3.854\,\mathrm{kg}/\mathrm{s} .$$

**Answer.** (a) $\dot{m}_{\mathrm{a}} = 1.394\,\mathrm{kg}/\mathrm{s}$

**(b)** $\dot{W}_{\mathrm{in}} = 378.0\,\mathrm{kW}$ into the compressor

**(c)** $\dot{m}_{\mathrm{w}} = 3.854\,\mathrm{kg}/\mathrm{s}$

**Discussion.** The heat loss raises the power the compressor needs. The
shaft has to supply the enthalpy rise of the air and also whatever leaks out
through the casing, so $q_{\mathrm{out}}$ is added, not subtracted. For a turbine it
goes the other way. The mass flow rate must come from the inlet state, because
the $1.2\,\mathrm{m}^{3}/\mathrm{s}$ was measured there; the volume flow rate
at the exit is much smaller even though $\dot{m}_{\mathrm{a}}$ is the same. In part

**(c)** the choice of boundary matters: with both streams inside the control volume
the heat passed from air to water never crosses it, and no $\dot{Q}$ appears.`,
        figure: 'practice/aer309/a-q6.svg',
      },
    ],
  },
  {
    id: 'aer309-t1-b',
    number: 2,
    heading: 'Test 1 practice B',
    short: 'B',
    title: "Rigid tank, steam heating, cycle, diffuser, turbine, mixing",
    ref: 'Ch. 1–5',
    blurb: String.raw`Six more questions, 100 marks, picking up what Practice A did not reach: an ideal gas in a rigid tank, electrical work with constant-pressure heating of steam and interpolation in Table A-6, the thermal efficiency of a cycle, a diffuser, a steam turbine with heat loss and kinetic energy, and a mixing chamber with a compressed liquid. Questions 2, 5 and 6 need the water tables (A-4, A-5, A-6). In the control-volume questions $V$ is velocity.`,
    intro: String.raw`**Every question.** Name the system (closed or control volume), list the assumptions (steady, ideal gas, adiabatic, $\Delta KE$ and $\Delta PE$ negligible), sketch it, fix each state from the tables or the ideal-gas law, write the mass balance and then the energy balance, and carry units to a circled answer.

**Ch. 1: pressure and temperature.** Use absolute values only: $P_{abs} = P_{atm} + P_{gage} = P_{atm} - P_{vac}$ and $T(\mathrm{K}) = T(^\circ\mathrm{C}) + 273.15$.

| Tool | Rule |
|---|---|
| hydrostatics | $\Delta P = \rho g \Delta z$, $P = P_{atm} + \rho g h$ |
| manometer walk | going down add $\rho g h$, going up subtract it; same level in the same fluid means same $P$ |
| barometer | $P_{atm} = \rho_{Hg}\, g\, h$, $1\ \mathrm{atm} = 101.325\ \mathrm{kPa} = 760\ \mathrm{mmHg}$ |
| unit bridges | $1\ \mathrm{kPa\cdot m^3} = 1\ \mathrm{kJ}$, $1\ \mathrm{kJ/kg} = 1000\ \mathrm{m^2/s^2}$, $1\ \mathrm{L} = 0.001\ \mathrm{m^3}$ |

**Ch. 2: energy, work, heat.** $e = u + V^2/2 + gz$. Signs: $Q > 0$ in, $W > 0$ out; heat is driven by $\Delta T$, everything else crossing the boundary is work.

| Which work? | Formula |
|---|---|
| boundary | $W_b = \int P\,d\mathcal{V}$; constant $P$: $P(\mathcal{V}_2 - \mathcal{V}_1)$; constant $\mathcal{V}$: 0 |
| polytropic $P\mathcal{V}^n = C$ | $W_b = \dfrac{P_2\mathcal{V}_2 - P_1\mathcal{V}_1}{1 - n}$; $n = 1$: $P_1\mathcal{V}_1\ln(\mathcal{V}_2/\mathcal{V}_1)$ |
| shaft, electrical | $W_{sh} = 2\pi n T$, $W_e = V I \Delta t$ |
| pump | $\eta = \Delta\dot{E}_{mech}/\dot{W}_{elect}$, $\Delta P = \Delta\dot{E}_{mech}/\dot{\mathcal{V}}$ |
| heat rates | $kA\dfrac{T_1 - T_2}{L}$, $hA(T_s - T_\infty)$, $\varepsilon\sigma A(T_s^4 - T_{surr}^4)$ with $T$ in K |

**Ch. 3: properties.** Water or refrigerant: compare with the saturation values at the given $P$ or $T$. Compressed liquid if $T < T_{sat}(P)$ ($y \approx y_f(T)$); saturated mixture if $v_f < v < v_g$ ($x = (v - v_f)/v_{fg}$, $y = y_f + x\,y_{fg}$); superheated if $T > T_{sat}(P)$ or $v > v_g$ (Table A-6, interpolate). Ideal gas: $Pv = RT$, $R = R_u/M$, $c_p - c_v = R$, $h = u + RT$. For $\Delta u$, $\Delta h$ use Table A-17 if given, otherwise $c_v\Delta T$, $c_p\Delta T$ (air: $R = 0.2870$, $c_p = 1.005$, $c_v = 0.718\ \mathrm{kJ/(kg\cdot K)}$, $k = 1.4$). Liquids and solids: $\Delta u = c\Delta T$, $\Delta h = c\Delta T + v\Delta P$.

**Ch. 4: closed systems.** $Q - W = \Delta U + \Delta KE + \Delta PE$ with $W = W_b + W_{other}$.

| Process | Result |
|---|---|
| constant volume | $W_b = 0$, $Q - W_{other} = \Delta U$ |
| constant pressure | $Q - W_{other} = \Delta H$ |
| isothermal ideal gas | $\Delta U = 0$, $Q = W$ |
| adiabatic | $Q = 0$, $-W = \Delta U$ |
| insulated, several bodies | $\sum m c (T_f - T_i) = 0$ |
| cycle | $\Delta U = 0$, $W_{net} = Q_{in} - Q_{out}$, $\eta_{th} = W_{net}/Q_{in}$ |

**Ch. 5: steady-flow devices.** $\dot{m} = \rho V A = VA/v$; steady: $\sum\dot{m}_{in} = \sum\dot{m}_{out}$; stream energy $\theta = h + V^2/2 + gz$.

| Device | Balance |
|---|---|
| nozzle, diffuser | $h_1 + V_1^2/2 = h_2 + V_2^2/2$ (divide $V^2/2$ by 1000 for kJ/kg) |
| turbine | $\dot{W}_{out} = \dot{m}(h_1 - h_2) - \dot{m}\,q_{out}$ |
| compressor | $\dot{W}_{in} = \dot{m}(h_2 - h_1) + \dot{m}\,q_{out}$ |
| throttle | $h_1 = h_2$ |
| mixing chamber, heat exchanger | $\sum\dot{m}h_{in} = \sum\dot{m}h_{out}$ |`,
    pdf: 'practice/aer309/test1-practice-b.pdf',
    problems: [
      {
        id: 'aer309-b-q1',
        label: 'Q1',
        method: '',
        statement: String.raw`*[10 marks]* A rigid $0.8\,\mathrm{m}^{3}$ tank holds air at $20{}^\circ\mathrm{C}$. The
pressure gauge on the tank reads $200\,\mathrm{kPa}$ and the atmospheric
pressure is $98\,\mathrm{kPa}$.

**(a)** Find the mass of air in the tank.

**(b)** The tank is left in the sun and the air warms to $60{}^\circ\mathrm{C}$.
 Find the new gauge reading.

**(c)** A valve is opened to bring the gauge back to
 $200\,\mathrm{kPa}$ while the air stays at $60{}^\circ\mathrm{C}$. Find
 the mass of air that has to be let out.`,
        solution: "**Given.** $V = 0.8\\,\\mathrm{m}^{3}$, $T_1 = 20{}^\\circ\\mathrm{C} = 293.15\\,\\mathrm{K}$, $P_{\\mathrm{gage,1}} = 200\\,\\mathrm{kPa}$,\n$P_{\\mathrm{atm}} = 98\\,\\mathrm{kPa}$, $T_2 = 60{}^\\circ\\mathrm{C} = 333.15\\,\\mathrm{K}$.\n\n**Find.** ($m_1$, $P_{\\mathrm{gage,2}}$, $m_{\\mathrm{out}}$)\n\n**Strategy.** The ideal-gas law needs absolute pressure and absolute\ntemperature. Convert first, then use $PV = mRT$ at each state.\n\n**Assumptions.** Air is an ideal gas. The tank is rigid, so $V$ is fixed.\n\n**Analysis.** *(a) Mass.* The absolute pressure is\n$P_1 = P_{\\mathrm{gage,1}} + P_{\\mathrm{atm}} = 200 + 98 = 298\\,\\mathrm{kPa}$.\n\n$$m_1 = \\frac{P_1 V}{R T_1} = \\frac{(298\\,\\mathrm{kPa})(0.8\\,\\mathrm{m}^{3})} {(0.287\\,\\mathrm{kJ}/(\\mathrm{kg}\\cdot \\mathrm{K}))(293.15\\,\\mathrm{K})} = 2.8336\\,\\mathrm{kg} .$$\n\n*(b) Heating at constant volume and mass.* With $m$ and $V$ fixed,\n$P/T$ is constant:\n\n$$P_2 = P_1\\,\\frac{T_2}{T_1} = (298\\,\\mathrm{kPa})\\,\\frac{333.15}{293.15} = 338.66\\,\\mathrm{kPa} ,$$\n\n$$P_{\\mathrm{gage,2}} = P_2 - P_{\\mathrm{atm}} = 338.66 - 98 = 240.66\\,\\mathrm{kPa} .$$\n\n*(c) Bleeding air.* State 3 is back at $P_3 = 298\\,\\mathrm{kPa}$\nwith $T_3 = 333.15\\,\\mathrm{K}$:\n\n$$m_3 = \\frac{P_3 V}{R T_3} = \\frac{(298)(0.8)}{(0.287)(333.15)}\\,\\mathrm{kg} = 2.4934\\,\\mathrm{kg} ,$$\n\n$$m_{\\mathrm{out}} = m_1 - m_3 = 2.8336 - 2.4934 = 0.3402\\,\\mathrm{kg} .$$\n\n**Answer.** (a) $m_1 = 2.834\\,\\mathrm{kg}$\n\n**(b)** the gauge reads $240.7\\,\\mathrm{kPa}$\n\n**(c)** $m_{\\mathrm{out}} = 0.3402\\,\\mathrm{kg}$\n\n**Discussion.** Using gage pressure and ${}^\\circ\\mathrm{C}$ in part (b) gives\n$200 \\times 60/20 = 600\\,\\mathrm{kPa}$, which is wildly off. The absolute\ntemperature rises by only $13.6%$, so the absolute pressure rises\nby $13.6%$ too.",
        figure: 'practice/aer309/b-q1.svg',
      },
      {
        id: 'aer309-b-q2',
        label: 'Q2',
        method: '',
        statement: String.raw`*[20 marks]* A piston-cylinder device contains $0.05\,\mathrm{kg}$ of saturated water vapor
at $300\,\mathrm{kPa}$. The piston is free to move, so the pressure stays
constant. A resistance heater inside the cylinder is connected to a
$120\,\mathrm{V}$ supply and draws $0.5\,\mathrm{A}$ for $4\,\mathrm{min}$. During
that time the steam loses $2\,\mathrm{kJ}$ of heat through the cylinder
wall.

**(a)** Find the electrical work done on the steam.

**(b)** Find the final temperature of the steam.

**(c)** Find the boundary work.`,
        solution: "**Sign convention.** $Q > 0$ into the steam, $W > 0$ done by the steam. The\nheater does work on the steam, so it enters the balance as $-W_{\\mathrm{e,in}}$.\n\n**Given.** $m = 0.05\\,\\mathrm{kg}$, $P = 300\\,\\mathrm{kPa}$\n(constant), state 1 saturated vapor, $\\mathcal{E} = 120\\,\\mathrm{V}$,\n$I = 0.5\\,\\mathrm{A}$, $\\Delta t = 4\\,\\mathrm{min} = 240\\,\\mathrm{s}$,\n$Q_{\\mathrm{out}} = 2\\,\\mathrm{kJ}$.\n\n**Find.** ($W_{\\mathrm{e,in}}$, $T_2$, $W_{\\mathrm{b}}$)\n\n**Strategy.** At constant pressure the boundary work and $\\Delta U$ combine\ninto $\\Delta H$, so the energy balance gives $h_2$ directly. Then $P$ and $h_2$\nfix state 2 in Table A-6.\n\n**Assumptions.** Closed system: the steam. The heater wire itself is part of\nthe system and stores no energy. Quasi-equilibrium expansion at constant\npressure. Kinetic and potential energy changes are zero.\n\n**Analysis.** *(a) Electrical work.*\n\n$$W_{\\mathrm{e,in}} = \\mathcal{E} I\\,\\Delta t = (120\\,\\mathrm{V})(0.5\\,\\mathrm{A})(240\\,\\mathrm{s}) = 14400\\,\\mathrm{J} = 14.40\\,\\mathrm{kJ} .$$\n\n*(b) Energy balance.*\n\n$$Q - W = \\Delta U \\quad\\Longrightarrow\\quad -Q_{\\mathrm{out}} - \\left(W_{\\mathrm{b}} - W_{\\mathrm{e,in}}\\right) = U_2 - U_1 .$$\n\nAt constant pressure $W_{\\mathrm{b}} = P(V_2 - V_1)$, and\n$\\Delta U + P\\,\\Delta V = \\Delta H$, so\n\n$$W_{\\mathrm{e,in}} - Q_{\\mathrm{out}} = m\\left(h_2 - h_1\\right) \\quad\\Longrightarrow\\quad h_2 = h_1 + \\frac{W_{\\mathrm{e,in}} - Q_{\\mathrm{out}}}{m} .$$\n\nState 1 is saturated vapor at $300\\,\\mathrm{kPa}$. From Table A-5,\n$h_1 = h_{\\mathrm{g}} = 2724.9\\,\\mathrm{kJ}/\\mathrm{kg}$ and\n$v_1 = v_{\\mathrm{g}} = 0.60582\\,\\mathrm{m}^{3}/\\mathrm{kg}$. Then\n\n$$h_2 = 2724.9 + \\frac{(14.40 - 2.00)\\,\\mathrm{kJ}}{0.05\\,\\mathrm{kg}} = 2724.9 + 248.0 = 2972.9\\,\\mathrm{kJ}/\\mathrm{kg} .$$\n\nSince $h_2 > h_{\\mathrm{g}}$, state 2 is superheated vapor. Table A-6 at\n$0.30\\,\\mathrm{MPa}$ brackets it:\n\n| {$T$ (${}^\\circ\\mathrm{C}$)} | {$v$ ($\\mathrm{m}^{3}/\\mathrm{kg}$)} | {$h$ ($\\mathrm{kJ}/\\mathrm{kg}$)} |\n|---|---|---|\n| 250 | 0.79645 | 2967.9 |\n| 300 | 0.87535 | 3069.6 |\n\nInterpolating on $h$, the fraction of the way from the first row to the second\nis\n\n$$f = \\frac{2972.9 - 2967.9}{3069.6 - 2967.9} = \\frac{5.0}{101.7} = 0.04916 ,$$\n\n$$T_2 = 250 + (0.04916)(300 - 250) = 252.46{}^\\circ\\mathrm{C} .$$\n\n*(c) Boundary work.* The same fraction gives the specific volume:\n\n$$v_2 = 0.79645 + (0.04916)(0.87535 - 0.79645) = 0.80033\\,\\mathrm{m}^{3}/\\mathrm{kg} ,$$\n\n$$W_{\\mathrm{b}} = mP\\left(v_2 - v_1\\right) = (0.05\\,\\mathrm{kg})(300\\,\\mathrm{kPa}) (0.80033 - 0.60582)\\,\\mathrm{m}^{3}/\\mathrm{kg} = 2.918\\,\\mathrm{kJ} .$$\n\n**Answer.** (a) $W_{\\mathrm{e,in}} = 14.40\\,\\mathrm{kJ}$, done on the steam\n\n**(b)** $T_2 = 252.5{}^\\circ\\mathrm{C}$\n\n**(c)** $W_{\\mathrm{b}} = 2.918\\,\\mathrm{kJ}$, done by the steam\n\n**Discussion.** Of the net $12.40\\,\\mathrm{kJ}$ added,\n$2.918\\,\\mathrm{kJ}$ goes into pushing the piston up and the other\n$9.482\\,\\mathrm{kJ}$ raises the internal energy. Using $\\Delta U$ in place\nof $\\Delta H$ in the balance would count the boundary work twice or not at all,\nand it is the most common slip in this kind of question.",
        figure: 'practice/aer309/b-q2.svg',
      },
      {
        id: 'aer309-b-q3',
        label: 'Q3',
        method: '',
        statement: String.raw`*[15 marks]* Air in a piston-cylinder device goes through a cycle made of three processes.

- 1-2: heat is added at constant volume, from $100\,\mathrm{kPa}$ and
 $300\,\mathrm{K}$ until the pressure is $300\,\mathrm{kPa}$.
- 2-3: the air expands with no heat transfer, following $Pv^k = \text{constant}$ with $k = 1.4$, until the pressure is back to
 $100\,\mathrm{kPa}$.
- 3-1: the air is cooled at constant pressure back to the initial state.

Use constant specific heats.

**(a)** Sketch the cycle on a $P$-$v$ diagram.

**(b)** Find the heat added and the heat rejected, per kilogram of air.

**(c)** Find the net work per kilogram and the thermal efficiency.`,
        solution: String.raw`**Sign convention.** $Q > 0$ into the air, $W > 0$ done by the air. The
magnitudes $q_{\mathrm{in}}$ and $q_{\mathrm{out}}$ are both written as positive numbers.

**Given.** $P_1 = 100\,\mathrm{kPa}$, $T_1 = 300\,\mathrm{K}$,
$P_2 = 300\,\mathrm{kPa}$, $v_2 = v_1$, $P_3 = P_1$, $k = 1.4$.

**Find.** ($q_{\mathrm{in}}$, $q_{\mathrm{out}}$, $w_{\mathrm{net}}$, $\eta_{\mathrm{th}}$)

**Strategy.** Find the three temperatures first. Then heat is added only in
1-2 and rejected only in 3-1, and over a cycle $w_{\mathrm{net}} = q_{\mathrm{in}} - q_{\mathrm{out}}$.

**Assumptions.** Closed system. Ideal gas with constant specific heats.
Quasi-equilibrium processes.

**Analysis.** *Temperatures.* Process 1-2 is at constant volume, so
$P/T$ is constant:

$$T_2 = T_1\,\frac{P_2}{P_1} = (300\,\mathrm{K})\,\frac{300}{100} = 900\,\mathrm{K} .$$

Process 2-3 is polytropic with $n = k$:

$$T_3 = T_2\left(\frac{P_3}{P_2}\right)^{(k-1)/k} = (900\,\mathrm{K})\left(\frac{100}{300}\right)^{0.4/1.4} = (900\,\mathrm{K})(0.73060) = 657.54\,\mathrm{K} .$$

*(b) Heat added, process 1-2.* No boundary work at constant volume, so
$q - 0 = \Delta u$:

$$q_{\mathrm{in}} = c_v\left(T_2 - T_1\right) = (0.718\,\mathrm{kJ}/(\mathrm{kg}\cdot \mathrm{K}))(900 - 300)\,\mathrm{K} = 430.80\,\mathrm{kJ}/\mathrm{kg} .$$

*Heat rejected, process 3-1.* At constant pressure $q = \Delta h$, which
is negative here because the air cools. Its magnitude is

$$q_{\mathrm{out}} = c_p\left(T_3 - T_1\right) = (1.005\,\mathrm{kJ}/(\mathrm{kg}\cdot \mathrm{K}))(657.54 - 300)\,\mathrm{K} = 359.33\,\mathrm{kJ}/\mathrm{kg} .$$

*(c) Net work and efficiency.* Over the cycle $\Delta u = 0$, so

$$w_{\mathrm{net}} = q_{\mathrm{in}} - q_{\mathrm{out}} = 430.80 - 359.33 = 71.47\,\mathrm{kJ}/\mathrm{kg} ,$$

$$\eta_{\mathrm{th}} = \frac{w_{\mathrm{net}}}{q_{\mathrm{in}}} = \frac{71.47}{430.80} = 0.1659 .$$

**Answer.** (b) $q_{\mathrm{in}} = 430.8\,\mathrm{kJ}/\mathrm{kg}$,
$q_{\mathrm{out}} = 359.3\,\mathrm{kJ}/\mathrm{kg}$

**(c)** $w_{\mathrm{net}} = 71.47\,\mathrm{kJ}/\mathrm{kg}$ done by the air,
$\eta_{\mathrm{th}} = 0.1659 = 16.59\%$

**Check.** Add up the work process by process. $w_{12} = 0$. In 2-3,
$q = 0$ so $w_{23} = -\Delta u = c_v(T_2 - T_3) = (0.718)(242.46) = 174.09\,\mathrm{kJ}/\mathrm{kg}$. In 3-1,
$w_{31} = P_1(v_1 - v_3) = R(T_1 - T_3) = (0.287)(-357.54) = -102.61\,\mathrm{kJ}/\mathrm{kg}$. The sum is
$71.47\,\mathrm{kJ}/\mathrm{kg}$, the same as before.
The diagram is on the next page.

**$P$-$v$ diagram for Question 3** (drawn to scale)

| State | {$P$ ($\mathrm{kPa}$)} | {$T$ ($\mathrm{K}$)} | {$v$ ($\mathrm{m}^{3}/\mathrm{kg}$)} |
|---|---|---|---|
| 1 | 100 | 300 | 0.861 |
| 2 | 300 | 900 | 0.861 |
| 3 | 100 | 657.54 | 1.887 |

The specific volumes come from $v = RT/P$. The cycle runs clockwise, so the net
work is positive and equals the shaded area.`,
        figure: 'practice/aer309/b-q3.svg',
        solutionFigure: 'practice/aer309/b-s3.svg',
      },
      {
        id: 'aer309-b-q4',
        label: 'Q4',
        method: '',
        statement: String.raw`*[15 marks]* Air enters the diffuser of a jet engine steadily at $80\,\mathrm{kPa}$ and
$280\,\mathrm{K}$ with a velocity of $230\,\mathrm{m}/\mathrm{s}$. The inlet
area is $0.04\,\mathrm{m}^{2}$. The air leaves at
$30\,\mathrm{m}/\mathrm{s}$ through an exit area of
$0.25\,\mathrm{m}^{2}$. The diffuser is adiabatic.

**(a)** Find the mass flow rate.

**(b)** Find the exit temperature.

**(c)** Find the exit pressure.`,
        solution: String.raw`**Sign convention.** The balance is written as energy in equals energy out.

**Given.** $P_1 = 80\,\mathrm{kPa}$, $T_1 = 280\,\mathrm{K}$,
$V_1 = 230\,\mathrm{m}/\mathrm{s}$, $A_1 = 0.04\,\mathrm{m}^{2}$,
$V_2 = 30\,\mathrm{m}/\mathrm{s}$, $A_2 = 0.25\,\mathrm{m}^{2}$.

**Find.** ($\dot{m}$, $T_2$, $P_2$)

**Assumptions.** Control volume: the diffuser, one inlet and one exit.
Steady flow. Adiabatic and no shaft, so $\dot{Q} = \dot{W} = 0$. Potential
energy change is zero. Air is an ideal gas with constant $c_p$.

**Analysis.** *(a) Mass balance at the inlet.*

$$v_1 = \frac{RT_1}{P_1} = \frac{(0.287\,\mathrm{kJ}/(\mathrm{kg}\cdot \mathrm{K}))(280\,\mathrm{K})} {80\,\mathrm{kPa}} = 1.0045\,\mathrm{m}^{3}/\mathrm{kg} ,$$

$$\dot{m} = \frac{V_1 A_1}{v_1} = \frac{(230\,\mathrm{m}/\mathrm{s})(0.04\,\mathrm{m}^{2})} {1.0045\,\mathrm{m}^{3}/\mathrm{kg}} = 9.1588\,\mathrm{kg}/\mathrm{s} .$$

*(b) Energy balance.* Per unit mass,

$$h_1 + \frac{V_1^2}{2} = h_2 + \frac{V_2^2}{2} \quad\Longrightarrow\quad c_p\left(T_2 - T_1\right) = \frac{V_1^2 - V_2^2}{2} .$$

The kinetic energy term, converted with
$1\,\mathrm{kJ}/\mathrm{kg} = 1000\,\mathrm{m}^{2}/\mathrm{s}^{2}$:

$$\frac{V_1^2 - V_2^2}{2} = \frac{(230^2 - 30^2)\,\mathrm{m}^{2}/\mathrm{s}^{2}}{2} \left(\frac{1\,\mathrm{kJ}/\mathrm{kg}} {1000\,\mathrm{m}^{2}/\mathrm{s}^{2}}\right) = 26.00\,\mathrm{kJ}/\mathrm{kg} .$$

$$T_2 = T_1 + \frac{26.00\,\mathrm{kJ}/\mathrm{kg}}{c_p} = 280 + \frac{26.00}{1.005} = 305.87\,\mathrm{K} .$$

*(c) Mass balance at the exit.* The same $\dot{m}$ leaves, so

$$v_2 = \frac{V_2 A_2}{\dot{m}} = \frac{(30\,\mathrm{m}/\mathrm{s})(0.25\,\mathrm{m}^{2})} {9.1588\,\mathrm{kg}/\mathrm{s}} = 0.81889\,\mathrm{m}^{3}/\mathrm{kg} ,$$

$$P_2 = \frac{RT_2}{v_2} = \frac{(0.287)(305.87)}{0.81889}\,\mathrm{kPa} = 107.2\,\mathrm{kPa} .$$

**Answer.** (a) $\dot{m} = 9.159\,\mathrm{kg}/\mathrm{s}$

**(b)** $T_2 = 305.9\,\mathrm{K}$

**(c)** $P_2 = 107.2\,\mathrm{kPa}$

**Discussion.** A diffuser trades velocity for pressure: the air slows down,
and both its temperature and its pressure rise. Forgetting the factor of 1000
gives a temperature rise of $25870\,\mathrm{K}$ in place of $25.87\,\mathrm{K}$,
so an absurd $T_2$ is the sign that the conversion was missed.`,
        figure: 'practice/aer309/b-q4.svg',
      },
      {
        id: 'aer309-b-q5',
        label: 'Q5',
        method: '',
        statement: String.raw`*[20 marks]* Steam enters a turbine steadily at $4\,\mathrm{MPa}$ and
$500{}^\circ\mathrm{C}$ with a velocity of $60\,\mathrm{m}/\mathrm{s}$. It leaves at
$30\,\mathrm{kPa}$ with a quality of 0.90 and a velocity of
$140\,\mathrm{m}/\mathrm{s}$. The mass flow rate is
$8\,\mathrm{kg}/\mathrm{s}$, and the turbine casing loses
$25\,\mathrm{kJ}$ of heat for every kilogram of steam.

**(a)** Find the change in kinetic energy per kilogram of steam.

**(b)** Find the power output of the turbine.

**(c)** Find the inlet flow area.`,
        solution: String.raw`**Sign convention.** Each term is a positive quantity with its direction in
the subscript, and the balance is written as energy in equals energy out.

**Given.** $P_1 = 4\,\mathrm{MPa}$, $T_1 = 500{}^\circ\mathrm{C}$,
$V_1 = 60\,\mathrm{m}/\mathrm{s}$, $P_2 = 30\,\mathrm{kPa}$,
$x_2 = 0.90$, $V_2 = 140\,\mathrm{m}/\mathrm{s}$,
$\dot{m} = 8\,\mathrm{kg}/\mathrm{s}$,
$q_{\mathrm{out}} = 25\,\mathrm{kJ}/\mathrm{kg}$.

**Find.** ($\Delta ke$, $\dot{W}_{\mathrm{out}}$, $A_1$)

**Assumptions.** Control volume: the turbine, one inlet and one exit. Steady
flow. Potential energy change is negligible.

**Properties.** *State 1.* At $4\,\mathrm{MPa}$ the saturation
temperature is $250.35{}^\circ\mathrm{C}$, so $500{}^\circ\mathrm{C}$ is superheated.
From Table A-6:

$$v_1 = 0.08644\,\mathrm{m}^{3}/\mathrm{kg}, \qquad h_1 = 3446.0\,\mathrm{kJ}/\mathrm{kg} .$$

*State 2.* Saturated mixture at $30\,\mathrm{kPa}$. From Table A-5,
$h_{\mathrm{f}} = 289.27\,\mathrm{kJ}/\mathrm{kg}$ and
$h_{\mathrm{fg}} = 2335.3\,\mathrm{kJ}/\mathrm{kg}$, so

$$h_2 = h_{\mathrm{f}} + x_2 h_{\mathrm{fg}} = 289.27 + (0.90)(2335.3) = 2391.04\,\mathrm{kJ}/\mathrm{kg} .$$

**Analysis.** *(a) Kinetic energy change.*

$$\Delta ke = \frac{V_2^2 - V_1^2}{2} = \frac{(140^2 - 60^2)\,\mathrm{m}^{2}/\mathrm{s}^{2}}{2} \left(\frac{1\,\mathrm{kJ}/\mathrm{kg}} {1000\,\mathrm{m}^{2}/\mathrm{s}^{2}}\right) = 8.000\,\mathrm{kJ}/\mathrm{kg} .$$

*(b) Energy balance.* Per unit mass, energy in equals energy out:

$$h_1 + \frac{V_1^2}{2} = h_2 + \frac{V_2^2}{2} + w_{\mathrm{out}} + q_{\mathrm{out}} \quad\Longrightarrow\quad w_{\mathrm{out}} = \left(h_1 - h_2\right) - \Delta ke - q_{\mathrm{out}} .$$

$$w_{\mathrm{out}} = (3446.0 - 2391.04) - 8.000 - 25 = 1054.96 - 33.00 = 1021.96\,\mathrm{kJ}/\mathrm{kg} ,$$

$$\dot{W}_{\mathrm{out}} = \dot{m}\,w_{\mathrm{out}} = (8\,\mathrm{kg}/\mathrm{s})(1021.96\,\mathrm{kJ}/\mathrm{kg}) = 8175.7\,\mathrm{kW} .$$

*(c) Inlet area.* From $\dot{m} = V_1 A_1 / v_1$,

$$A_1 = \frac{\dot{m} v_1}{V_1} = \frac{(8\,\mathrm{kg}/\mathrm{s})(0.08644\,\mathrm{m}^{3}/\mathrm{kg})} {60\,\mathrm{m}/\mathrm{s}} = 0.011525\,\mathrm{m}^{2} .$$

**Answer.** (a) $\Delta ke = 8.000\,\mathrm{kJ}/\mathrm{kg}$ (an increase)

**(b)** $\dot{W}_{\mathrm{out}} = 8176\,\mathrm{kW} = 8.176\,\mathrm{MW}$

**(c)** $A_1 = 0.01153\,\mathrm{m}^{2} = 115.3\,\mathrm{cm}^{2}$

**Discussion.** The enthalpy drop of $1055\,\mathrm{kJ}/\mathrm{kg}$
does three jobs: it speeds the steam up ($8\,\mathrm{kJ}/\mathrm{kg}$), it
leaks out as heat ($25\,\mathrm{kJ}/\mathrm{kg}$), and what is left turns
the shaft. Both losses come off the output, the opposite of the compressor in
Set 2 where the heat loss added to the input. The kinetic energy change is under
$1%$ of the enthalpy drop, which is why it is so often neglected for
turbines.`,
        figure: 'practice/aer309/b-q5.svg',
      },
      {
        id: 'aer309-b-q6',
        label: 'Q6',
        method: '',
        statement: String.raw`*[20 marks]* Cold water at $15{}^\circ\mathrm{C}$ enters an insulated mixing chamber at
$2.5\,\mathrm{kg}/\mathrm{s}$. It is heated by mixing with superheated steam
at $200{}^\circ\mathrm{C}$. All three streams are at $200\,\mathrm{kPa}$, and the
mixture leaves at $50{}^\circ\mathrm{C}$.

**(a)** State the phase of each of the three streams and justify it.

**(b)** Find the mass flow rate of steam that is needed.

**(c)** The mixture leaves through a pipe with an inside diameter of
 $5\,\mathrm{cm}$. Find its velocity.`,
        solution: String.raw`**Sign convention.** The balance is written as energy in equals energy out.

**Given.** $P = 200\,\mathrm{kPa}$ for all streams,
$T_1 = 15{}^\circ\mathrm{C}$, $\dot{m}_1 = 2.5\,\mathrm{kg}/\mathrm{s}$,
$T_2 = 200{}^\circ\mathrm{C}$, $T_3 = 50{}^\circ\mathrm{C}$,
$D_3 = 0.05\,\mathrm{m}$.

**Find.** (the three phases, $\dot{m}_2$, $V_3$)

**Assumptions.** Control volume: the mixing chamber, two inlets and one
exit. Steady flow. Insulated and no shaft, so $\dot{Q} = \dot{W} = 0$. Kinetic
and potential energy changes are negligible.

**Analysis.** *(a) Phases.* From Table A-5, the saturation
temperature at $200\,\mathrm{kPa}$ is $120.21{}^\circ\mathrm{C}$.

- Stream 1: $T_1 = 15{}^\circ\mathrm{C} < T_{\mathrm{sat}}$, compressed liquid.
- Stream 2: $T_2 = 200{}^\circ\mathrm{C} > T_{\mathrm{sat}}$, superheated vapor.
- Stream 3: $T_3 = 50{}^\circ\mathrm{C} < T_{\mathrm{sat}}$, compressed liquid.

*Properties.* A compressed liquid is treated as saturated liquid at the
same temperature, so from Table A-4:

$$h_1 \approx h_{\mathrm{f}}(15{}^\circ\mathrm{C}) = 62.982\,\mathrm{kJ}/\mathrm{kg}, \qquad h_3 \approx h_{\mathrm{f}}(50{}^\circ\mathrm{C}) = 209.34\,\mathrm{kJ}/\mathrm{kg}, \qquad v_3 \approx v_{\mathrm{f}}(50{}^\circ\mathrm{C}) = 0.001012\,\mathrm{m}^{3}/\mathrm{kg} .$$

From Table A-6 at $0.20\,\mathrm{MPa}$ and $200{}^\circ\mathrm{C}$,
$h_2 = 2870.7\,\mathrm{kJ}/\mathrm{kg}$.

*(b) Mass and energy balances.*

$$\begin{aligned}\text{Mass:}\quad & \dot{m}_1 + \dot{m}_2 = \dot{m}_3 \qquad\text{(1)} \\ \text{Energy:}\quad & \dot{m}_1 h_1 + \dot{m}_2 h_2 = \dot{m}_3 h_3 \qquad\text{(2)}\end{aligned}$$

Putting (1) into (2) and collecting terms,

$$\dot{m}_1 h_1 + \dot{m}_2 h_2 = \left(\dot{m}_1 + \dot{m}_2\right) h_3 \quad\Longrightarrow\quad \dot{m}_2 = \dot{m}_1\,\frac{h_3 - h_1}{h_2 - h_3} .$$

$$\dot{m}_2 = (2.5\,\mathrm{kg}/\mathrm{s})\, \frac{209.34 - 62.982}{2870.7 - 209.34} = (2.5\,\mathrm{kg}/\mathrm{s})\,\frac{146.36}{2661.4} = 0.13748\,\mathrm{kg}/\mathrm{s} .$$

*(c) Exit velocity.* From (1),
$\dot{m}_3 = 2.5 + 0.13748 = 2.6375\,\mathrm{kg}/\mathrm{s}$. The pipe area
is

$$A_3 = \frac{\pi D_3^2}{4} = \frac{\pi(0.05\,\mathrm{m})^2}{4} = 1.9635\times 10^{-3}\,\mathrm{m}^{2} ,$$

and from $\dot{m}_3 = V_3 A_3 / v_3$,

$$V_3 = \frac{\dot{m}_3 v_3}{A_3} = \frac{(2.6375\,\mathrm{kg}/\mathrm{s})(0.001012\,\mathrm{m}^{3}/\mathrm{kg})} {1.9635\times 10^{-3}\,\mathrm{m}^{2}} = 1.359\,\mathrm{m}/\mathrm{s} .$$

**Answer.** (a) 1: compressed liquid, 2: superheated vapor, 3: compressed liquid

**(b)** $\dot{m}_2 = 0.1375\,\mathrm{kg}/\mathrm{s}$

**(c)** $V_3 = 1.359\,\mathrm{m}/\mathrm{s}$

**Discussion.** Only about $55\,\mathrm{g}$ of steam is needed for each
kilogram of cold water, because each kilogram of steam gives up
$2661\,\mathrm{kJ}$ as it condenses and cools, while each kilogram of water
takes only $146.4\,\mathrm{kJ}$ to warm by $35{}^\circ\mathrm{C}$. As a check on
the compressed-liquid values, $c\,\Delta T = (4.18)(35) = 146.3\,\mathrm{kJ}/\mathrm{kg}$, which agrees with $h_3 - h_1$. The
exit kinetic energy is $1.359^2/2 = 0.92\,\mathrm{J}/\mathrm{kg}$, so
neglecting it was safe.`,
        figure: 'practice/aer309/b-q6.svg',
      },
    ],
  },
]
