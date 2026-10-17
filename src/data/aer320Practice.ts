import type { PracticeLab } from '@/types'

/* Generated from the AER320 Term Test 1 practice booklets in the Aerospace Semester 3 repo (LaTeX converted to
   Markdown with $…$ / $$…$$ KaTeX math, rendered by renderMarkdown in src/lib/markdown.ts).
   Figures are the booklets' TikZ drawings, exported to SVG under public/practice/. */

export const AER320_PRACTICE: PracticeLab[] = [
  {
    id: 'aer320-t1',
    number: 1,
    heading: 'Test 1 practice',
    short: 'T1',
    title: "Force vectors, moments and force systems",
    ref: 'HS ch. 1, 2, 4.1–4.9',
    blurb: String.raw`Part A (A1–A10) is a 10-minute concept check. Part B (P1–P11) is eleven problems in chapter order, each with a figure. For a timed mock test, do P1, P4, P6, P8 and P10(a) in 55 minutes with only your formula sheet. Sketch your own diagram from the statement before looking at the figure: on the real test that sketch is half the marks.`,
    intro: String.raw`| Step | Rule |
|---|---|
| position vector | tip minus tail: $\vec{r}_{AB} = \vec{r}_B - \vec{r}_A$; force along a line $\vec{F} = F\,\vec{r}_{AB}/r_{AB}$ |
| projection | $F_\parallel = \vec{F}\cdot\hat{u}_a$, $F_\perp = \sqrt{F^2 - F_\parallel^2}$ |
| moment | $\vec{M}_O = \vec{r}\times\vec{F}$ ($\vec{r}$ first); 2D: $M_O = xF_y - yF_x$, CCW positive |
| about an axis | $M_a = \hat{u}_a\cdot(\vec{r}\times\vec{F})$, $\vec{r}$ from any point on the axis to any point on the line of action |
| couples | free vectors: add straight into $\sum\vec{M}$, no $\vec{r}$ needed |
| force-couple at O | $\vec{F}_R = \sum\vec{F}$, $\vec{M}_{R_O} = \sum\vec{M}_C + \sum\vec{r}\times\vec{F}$ |
| single force | possible when $\vec{F}_R \perp \vec{M}_{R_O}$; $d = M_{R_O}/F_R$ |
| wrench | $M_\parallel = \vec{M}_{R_O}\cdot\hat{u}_{F_R}$, axis through P with $\vec{r}_{OP}\times\vec{F}_R = \vec{M}_\perp$ |
| distributed load | $F_R$ = area under $w(x)$, acting at the centroid of that area |

Answer with magnitude **and** direction (angle and quadrant, unit vector, or CW/CCW), with units on every line.`,
    pdf: 'practice/aer320/test1-practice.pdf',
    problems: [
      {
        id: 'aer320-t1-a1',
        label: 'A1',
        method: '',
        statement: String.raw`A force can slide along its line of action without changing its external effect on a
rigid body. The force is therefore a

**(a)** free vector (b) sliding vector (c) fixed vector (d) unit vector`,
        solution: String.raw`**(b)** sliding vector.`,
      },
      {
        id: 'aer320-t1-a2',
        label: 'A2',
        method: '',
        statement: String.raw`The moment of a couple is a (a) free vector (b) sliding vector (c) fixed vector. Why does
that make couples easy to deal with in a force-couple reduction?`,
        solution: String.raw`**(a)** free vector: it can be added straight into $\sum\vec{M}$ at any reduction point, with no
position vector.`,
      },
      {
        id: 'aer320-t1-a3',
        label: 'A3',
        method: '',
        statement: String.raw`$\vec{r}\times\vec{F} = \vec{0}$, where $\vec{r}$ runs from O to a point on the line of action of a
non-zero $\vec{F}$. What can you conclude?`,
        solution: String.raw`The line of action of $\vec{F}$ passes through O (so $\vec{r}\parallel\vec{F}$).`,
      },
      {
        id: 'aer320-t1-a4',
        label: 'A4',
        method: '',
        statement: String.raw`A force has $\alpha = 60^\circ$ and $\beta = 45^\circ$. What are the possible values of
$\gamma$?`,
        solution: String.raw`$\cos^2\gamma = 1 - 0.25 - 0.5 = 0.25$, so $\gamma = 60^\circ$ or $120^\circ$.`,
      },
      {
        id: 'aer320-t1-a5',
        label: 'A5',
        method: '',
        statement: String.raw`A system of parallel forces can always be reduced to

**(a)** a single force (b) a single couple (c) a single force, or a single couple if the
forces sum to zero (d) a wrench with non-zero pitch`,
        solution: String.raw`(c).`,
      },
      {
        id: 'aer320-t1-a6',
        label: 'A6',
        method: '',
        statement: String.raw`$\vec{F} = \{20\hat{\jmath}\}$ N acts at the point $(2, 0, 4)$ m. Without a determinant, state the moment
about the $y$ axis. Then find the moments about the $x$ and $z$ axes.`,
        solution: String.raw`$M_y = 0$, since the force is parallel to the $y$ axis. $\vec{M}_O = (2,0,4)\times(0,20,0) = \{-80\hat{\imath} + 40\hat{k}\}$ N$\cdot$m, so $M_x = -80$ N$\cdot$m and $M_z = 40$ N$\cdot$m.`,
      },
      {
        id: 'aer320-t1-a7',
        label: 'A7',
        method: '',
        statement: String.raw`A load rises linearly from 0 to 6 kN/m over 3 m. State the resultant and where it acts.`,
        solution: String.raw`9 kN, acting 2 m from the zero end (1 m from the 6 kN/m end).`,
      },
      {
        id: 'aer320-t1-a8',
        label: 'A8',
        method: '',
        statement: String.raw`The same force system is reduced to a force-couple system at A, then separately at B. Which
of $\vec{F}_R$ and $\vec{M}_R$ comes out the same both times?`,
        solution: String.raw`$\vec{F}_R$ is identical; $\vec{M}_R$ generally differs, by $\vec{r}\times\vec{F}_R$.`,
      },
      {
        id: 'aer320-t1-a9',
        label: 'A9',
        method: '',
        statement: String.raw`$\vec{F}\cdot\hat{u}_a$ comes out negative. What does that tell you?`,
        solution: String.raw`The component of $\vec{F}$ along the line points opposite to $\hat{u}_a$ (angle over $90^\circ$).`,
      },
      {
        id: 'aer320-t1-a10',
        label: 'A10',
        method: '',
        statement: String.raw`In $M_a = \hat{u}_a\cdot(\vec{r}\times\vec{F})$, where can $\vec{r}$ start and end?`,
        solution: String.raw`From any point on the axis to any point on the line of action of $\vec{F}$.`,
      },
      {
        id: 'aer320-t1-p1',
        label: 'P1',
        method: '',
        statement: String.raw`**Parallelogram law, law of sines (HS 2.3).** Two forces act on a hook. $F_1 = 400$ N is directed $60^\circ$ above the $+x$ axis. $F_2$ is
directed at an angle $\theta$ below the $+x$ axis.

**(a)** If $\theta = 20^\circ$, find $F_2$ so that the resultant acts along the $+x$ axis, and find
the resultant's magnitude.

**(b)** What $\theta$ makes $F_2$ as small as possible while the resultant still acts along $+x$?
Give that $F_2$ and the resultant.`,
        solution: String.raw`Draw the force triangle tip to tail with $\vec{F}_R$ along $+x$. The angle between $\vec{F}_1$ and
$\vec{F}_R$ is $60^\circ$ and between $\vec{F}_2$ and $\vec{F}_R$ is $20^\circ$, so the angle opposite
$\vec{F}_R$ is $180^\circ - 60^\circ - 20^\circ = 100^\circ$.

**(a)** Law of sines:

$$\frac{F_2}{\sin 60^\circ} = \frac{400}{\sin 20^\circ}\ \Rightarrow\ F_2 = \frac{400(0.8660)}{0.3420} = 1013\text{ N}, \qquad F_R = \frac{400\sin 100^\circ}{\sin 20^\circ} = 1152\text{ N}$$

Component check: $\sum F_y = 400\sin60^\circ - F_2\sin20^\circ = 346.4 - 346.4 = 0$. Good.

**(b)** $\vec{F}_2$ only has to cancel the 346.4 N vertical component of $\vec{F}_1$. The shortest vector
that does this is vertical, so $\theta = 90^\circ$ and $F_2 = 346.4$ N. The resultant is then just
$F_1\cos60^\circ = 200.0$ N.

**Answer.** **(a)** $F_2 = 1013$ N, $F_R = 1152$ N (b) $\theta = 90^\circ$, $F_2 = 346.4$ N, $F_R = 200.0$ N`,
        figure: 'practice/aer320/q1.svg',
        solutionFigure: 'practice/aer320/s1.svg',
      },
      {
        id: 'aer320-t1-p2',
        label: 'P2',
        method: '',
        statement: String.raw`**Components along non-perpendicular axes (HS 2.3, 2.9).** $F = 600$ N acts at $40^\circ$ counter-clockwise from the $u$ axis. The $v$ axis is at
$115^\circ$ counter-clockwise from the $u$ axis.

**(a)** Resolve $\vec{F}$ into components acting along $u$ and $v$.

**(b)** Find the projection of $\vec{F}$ onto the $v$ axis and explain why it is not the same as the
$v$ component from (a).`,
        solution: String.raw`**(a)** The components along $u$ and $v$ form a triangle with $\vec{F}$. The angle between $\vec{F}$ and $u$
is $40^\circ$, between $\vec{F}$ and $v$ is $115^\circ - 40^\circ = 75^\circ$, and the angle
opposite $\vec{F}$ is $180^\circ - 115^\circ = 65^\circ$.

$$F_u = \frac{600\sin 75^\circ}{\sin 65^\circ} = 639.5\text{ N},\qquad F_v = \frac{600\sin 40^\circ}{\sin 65^\circ} = 425.5\text{ N}$$

**(b)** Projection $= F\cos(\text{angle between } \vec{F} \text{ and } v) = 600\cos 75^\circ = 155.3$ N.
The two differ because $u$ and $v$ are not perpendicular: a component comes from the
parallelogram, a projection comes from dropping a perpendicular. They agree only for
orthogonal axes. When a test asks for the *components along* $u$ and $v$, it wants the
parallelogram.

**Answer.** **(a)** $F_u = 639.5$ N, $F_v = 425.5$ N (b) $\vec{F}\cdot\hat{u}_v = 155.3$ N`,
        figure: 'practice/aer320/q2.svg',
        solutionFigure: 'practice/aer320/s2.svg',
      },
      {
        id: 'aer320-t1-p3',
        label: 'P3',
        method: '',
        statement: String.raw`**Coplanar resultant (HS 2.4).** Three forces act at a point: $F_1 = 250$ N at $30^\circ$ above $+x$; $F_2 = 400$ N up and to the
left along a 3-4-5 slope (4 horizontal, 3 vertical); $F_3 = 300$ N at $45^\circ$ below $+x$.
Find the magnitude of the resultant and its direction measured counter-clockwise from $+x$.`,
        solution: String.raw`$$\begin{aligned}\vec{F}_1 &= 250(\cos30^\circ,\ \sin30^\circ) = (216.5,\ 125.0)\text{ N}\\ \vec{F}_2 &= 400(-\tfrac45,\ \tfrac35) = (-320.0,\ 240.0)\text{ N}\\ \vec{F}_3 &= 300(\cos45^\circ,\ -\sin45^\circ) = (212.1,\ -212.1)\text{ N}\\ F_{Rx} &= 108.6\text{ N},\qquad F_{Ry} = 152.9\text{ N}\\ F_R &= \sqrt{108.6^2 + 152.9^2} = 187.5\text{ N},\qquad \theta = \tan^{-1}(152.9/108.6) = 54.60^\circ\end{aligned}$$

Both components are positive, so the resultant is in the first quadrant.

**Answer.** $F_R = 187.5$ N at $54.60^\circ$ above $+x$`,
        figure: 'practice/aer320/q3.svg',
      },
      {
        id: 'aer320-t1-p4',
        label: 'P4',
        method: '',
        statement: String.raw`**Force along a line, dot product (HS 2.5 to 2.9).** A mast has its top at A$(0, 0, 8)$ m. Cable AB runs to anchor B$(3, -4, 0)$ m with tension
600 N, and cable AC to anchor C$(-2, 3, 0)$ m with tension 400 N.

**(a)** Write $\vec{F}_{AB}$ (the force on the mast) as a Cartesian vector and find its coordinate
direction angles.

**(b)** Find the resultant of the two cable forces at A.

**(c)** Find the angle between the two cables.

**(d)** Find the components of $\vec{F}_{AB}$ parallel and perpendicular to cable AC.`,
        solution: String.raw`**(a)** Tip minus tail: $\vec{r}_{AB} = (3, -4, -8)$ m, $|\vec{r}_{AB}| = \sqrt{89} = 9.434$ m.

$$\vec{F}_{AB} = 600\,\frac{(3,-4,-8)}{9.434} = \{190.8\hat{\imath} - 254.4\hat{\jmath} - 508.8\hat{k}\}\text{ N}$$

$\alpha = \cos^{-1}(3/9.434) = 71.46^\circ$, $\beta = \cos^{-1}(-4/9.434) = 115.1^\circ$,
$\gamma = \cos^{-1}(-8/9.434) = 148.0^\circ$.

**(b)** $\vec{r}_{AC} = (-2, 3, -8)$ m, $|\vec{r}_{AC}| = \sqrt{77} = 8.775$ m, so
$\vec{F}_{AC} = 400(-2,3,-8)/8.775 = \{-91.17\hat{\imath} + 136.8\hat{\jmath} - 364.7\hat{k}\}$ N.

$$\vec{F}_R = \{99.63\hat{\imath} - 117.6\hat{\jmath} - 873.5\hat{k}\}\text{ N},\qquad F_R = 887.0\text{ N}$$

**(c)** $\cos\theta = \hat{u}_{AB}\cdot\hat{u}_{AC} = \dfrac{(3)(-2) + (-4)(3) + (-8)(-8)}{9.434(8.775)} = \dfrac{46}{82.78} = 0.5557$, so $\theta = 56.24^\circ$.

**(d)** $F_\parallel = \vec{F}_{AB}\cdot\hat{u}_{AC} = 600(0.5557) = 333.4$ N and
$F_\perp = \sqrt{600^2 - 333.4^2} = 498.8$ N.

**Answer.** **(a)** $\{190.8\hat{\imath} - 254.4\hat{\jmath} - 508.8\hat{k}\}$ N; $\alpha = 71.46^\circ$, $\beta = 115.1^\circ$, $\gamma = 148.0^\circ$ (b) $\{99.63\hat{\imath} - 117.6\hat{\jmath} - 873.5\hat{k}\}$ N, 887.0 N (c) $56.24^\circ$ (d) 333.4 N, 498.8 N`,
        figure: 'practice/aer320/q4.svg',
      },
      {
        id: 'aer320-t1-p5',
        label: 'P5',
        method: '',
        statement: String.raw`**Moment in 2D (HS 4.1 to 4.4).** A 500 N force acts at point A, which sits at $(0.4, 0.3)$ m relative to O. The force points up
and to the left at $30^\circ$ above the $-x$ direction.

**(a)** Find $M_O$ using Varignon's theorem.

**(b)** Find the perpendicular distance from O to the line of action.

**(c)** Find the smallest force that, applied at A, gives a moment of 400 N$\cdot$m
*clockwise* about O. Give its magnitude and direction.`,
        solution: String.raw`**(a)** $\vec{F} = (-500\cos30^\circ,\ 500\sin30^\circ) = (-433.0,\ 250.0)$ N. With CCW positive,

$$M_O = xF_y - yF_x = 0.4(250.0) - 0.3(-433.0) = 100.0 + 129.9 = 229.9\text{ N}\cdot\text{m (CCW)}$$

Both terms turn the same way: the vertical component pushes up to the right of O, and the
horizontal component pushes left above O.

**(b)** $d = M_O/F = 229.9/500 = 0.4598$ m.

**(c)** For a fixed point of application the smallest force is perpendicular to OA, with the whole
distance $|OA| = \sqrt{0.4^2 + 0.3^2} = 0.5$ m as the arm: $F_{min} = 400/0.5 = 800.0$ N.
OA points at $\tan^{-1}(0.3/0.4) = 36.87^\circ$; for a clockwise moment the force must point
$90^\circ$ clockwise of that, at $36.87^\circ - 90^\circ = -53.13^\circ$, that is $53.13^\circ$
below $+x$. Check: $\vec{F} = (480, -640)$ N gives $M_O = 0.4(-640) - 0.3(480) = -400$ N$\cdot$m. Good.

**Answer.** **(a)** 229.9 N$\cdot$m CCW (b) 0.4598 m (c) 800.0 N at $53.13^\circ$ below $+x$`,
        figure: 'practice/aer320/q5.svg',
        solutionFigure: 'practice/aer320/s5.svg',
      },
      {
        id: 'aer320-t1-p6',
        label: 'P6',
        method: '',
        statement: String.raw`**Moment in 3D and about an axis (HS 4.3, 4.5).** $\vec{F} = \{60\hat{\imath} - 40\hat{\jmath} + 120\hat{k}\}$ N acts at A$(0.4, 0.6, 0.2)$ m.

**(a)** Find $\vec{M}_O$ and its magnitude.

**(b)** Find the moment of $\vec{F}$ about the axis $Oa$, which lies in the $xy$ plane and passes through
O and the point $(3, 4, 0)$ m. Give it as a scalar and as a vector.

**(c)** What is the moment about the $y$ axis?`,
        solution: String.raw`(a)

$$\vec{M}_O = \vec{r}_{OA}\times\vec{F} = \begin{vmatrix}\hat{\imath}&\hat{\jmath}&\hat{k}\\0.4&0.6&0.2\\60&-40&120\end{vmatrix}$$

$\hat{\imath}$: $0.6(120) - 0.2(-40) = 80.00$;
$\hat{\jmath}$: $-[0.4(120) - 0.2(60)] = -36.00$;
$\hat{k}$: $0.4(-40) - 0.6(60) = -52.00$.

$$\vec{M}_O = \{80.00\hat{\imath} - 36.00\hat{\jmath} - 52.00\hat{k}\}\text{ N}\cdot\text{m},\qquad M_O = 102.0\text{ N}\cdot\text{m}$$

**(b)** $\hat{u}_a = (3,4,0)/5 = (0.6, 0.8, 0)$. Since O is on the axis, $M_a = \hat{u}_a\cdot\vec{M}_O$:

$$M_a = 0.6(80.00) + 0.8(-36.00) + 0 = 19.20\text{ N}\cdot\text{m},\qquad \vec{M}_a = 19.20\,\hat{u}_a = \{11.52\hat{\imath} + 15.36\hat{\jmath}\}\text{ N}\cdot\text{m}$$

**(c)** $M_y = \hat{\jmath}\cdot\vec{M}_O = -36.00$ N$\cdot$m, meaning 36.00 N$\cdot$m about $-y$.

**Answer.** **(a)** $\{80.00\hat{\imath} - 36.00\hat{\jmath} - 52.00\hat{k}\}$ N$\cdot$m, 102.0 N$\cdot$m

**(b)** 19.20 N$\cdot$m, $\{11.52\hat{\imath} + 15.36\hat{\jmath}\}$ N$\cdot$m (c) $-36.00$ N$\cdot$m`,
        figure: 'practice/aer320/q6.svg',
      },
      {
        id: 'aer320-t1-p7',
        label: 'P7',
        method: '',
        statement: String.raw`**Couples in 3D (HS 4.6).** $\vec{F} = \{40\hat{\imath} - 30\hat{\jmath} + 60\hat{k}\}$ N acts at A$(0.2, 0.5, 0)$ m and $-\vec{F}$ acts at
B$(0, 0.1, 0.3)$ m. A second couple of 25 N$\cdot$m acts in the $-z$ direction.
Find the resultant couple moment: vector, magnitude and coordinate direction angles.`,
        solution: String.raw`Position vector from a point on $-\vec{F}$ to a point on $\vec{F}$: $\vec{r}_{BA} = (0.2, 0.4, -0.3)$ m.

$$\vec{M}_1 = \vec{r}_{BA}\times\vec{F} = \begin{vmatrix}\hat{\imath}&\hat{\jmath}&\hat{k}\\0.2&0.4&-0.3\\40&-30&60\end{vmatrix} = \{15.00\hat{\imath} - 24.00\hat{\jmath} - 22.00\hat{k}\}\text{ N}\cdot\text{m}$$

($\hat{\imath}$: $24 - 9$; $\hat{\jmath}$: $-(12 + 12)$; $\hat{k}$: $-6 - 16$.) Add $\vec{M}_2 = \{-25\hat{k}\}$ N$\cdot$m, which is a
free vector:

$$\vec{M}_R = \{15.00\hat{\imath} - 24.00\hat{\jmath} - 47.00\hat{k}\}\text{ N}\cdot\text{m},\qquad M_R = 54.86\text{ N}\cdot\text{m}$$

$\alpha = \cos^{-1}(15/54.86) = 74.13^\circ$, $\beta = \cos^{-1}(-24/54.86) = 115.9^\circ$,
$\gamma = \cos^{-1}(-47/54.86) = 148.9^\circ$.

**Answer.** $\{15.00\hat{\imath} - 24.00\hat{\jmath} - 47.00\hat{k}\}$ N$\cdot$m, 54.86 N$\cdot$m; $74.13^\circ$, $115.9^\circ$, $148.9^\circ$`,
        figure: 'practice/aer320/q7.svg',
      },
      {
        id: 'aer320-t1-p8',
        label: 'P8',
        method: '',
        statement: String.raw`**Equivalent system and single resultant on a beam (HS 4.7, 4.8).** A 6 m horizontal beam AB has A at the left end. Loads, all on the beam's axis:
8 kN down at 1.5 m from A; 5 kN at 4 m from A, directed down and to the right at
$60^\circ$ below the horizontal; a 12 kN$\cdot$m clockwise couple at 5 m; 3 kN down at B.

**(a)** Replace the loading with an equivalent force and couple at A.

**(b)** Reduce it to a single resultant force and find where its line of action crosses the beam.`,
        solution: String.raw`$x$ to the right, $y$ up, CCW positive. The inclined load: $5\cos60^\circ = 2.500$ kN to the
right and $5\sin60^\circ = 4.330$ kN down.

(a)

$$\begin{aligned}F_{Rx} &= 2.500\text{ kN},\qquad F_{Ry} = -8 - 4.330 - 3 = -15.33\text{ kN}\\ F_R &= \sqrt{2.500^2 + 15.33^2} = 15.53\text{ kN},\quad \theta = \tan^{-1}(15.33/2.500) = 80.74^\circ \text{ below } +x\\ M_{R_A} &= -8(1.5) - 4.330(4) - 12 - 3(6) = -59.32\text{ kN}\cdot\text{m}\end{aligned}$$

So 59.32 kN$\cdot$m clockwise. The 2.5 kN horizontal part acts along the beam axis through A and
has no moment about A. The couple enters directly with no distance.

**(b)** Put $\vec{F}_R$ on the beam at distance $x$ from A. Its moment about A is $xF_{Ry}$:

$$x(-15.33) = -59.32\ \Rightarrow\ x = 3.870\text{ m from A}$$

Sense check: a downward force to the right of A turns clockwise, which matches.

**Answer.** **(a)** $\{2.500\hat{\imath} - 15.33\hat{\jmath}\}$ kN (15.53 kN, $80.74^\circ$ below $+x$), $M_A = 59.32$ kN$\cdot$m CW (b) crosses at 3.870 m from A`,
        figure: 'practice/aer320/q8.svg',
        solutionFigure: 'practice/aer320/s8.svg',
      },
      {
        id: 'aer320-t1-p9',
        label: 'P9',
        method: '',
        statement: String.raw`**Parallel forces on a slab (HS 4.8).** A 4 m ($x$) by 3 m ($y$) slab lies in the $xy$ plane with a corner at O. Vertical forces:
400 N down at $(4, 0)$, 600 N down at $(4, 3)$, 300 N down at $(0, 3)$ and 250 N *up* at
$(2, 1.5)$ (m). Find the single resultant force and the point $(x, y)$ where it acts.`,
        solution: String.raw`$F_R = -400 - 600 - 300 + 250 = -1050$ N, so 1050 N down. With all forces parallel to $z$ the
single resultant sits at the force-weighted average position (signs included):

$$\bar{x} = \frac{4(-400) + 4(-600) + 0(-300) + 2(250)}{-1050} = \frac{-3500}{-1050} = 3.333\text{ m}$$

$$\bar{y} = \frac{0(-400) + 3(-600) + 3(-300) + 1.5(250)}{-1050} = \frac{-2325}{-1050} = 2.214\text{ m}$$

Same thing via moments: $M_{R_x} = \sum yF = -2325$, $M_{R_y} = -\sum xF = 3500$ N$\cdot$m, then
$x = -M_{R_y}/F_R$, $y = M_{R_x}/F_R$. The downward loads alone would put the resultant at $(3.077, 2.077)$ m; the upward
250 N at $(2, 1.5)$ pushes it further away from that point.

**Answer.** 1050 N down at $(3.333, 2.214)$ m`,
        figure: 'practice/aer320/q9.svg',
      },
      {
        id: 'aer320-t1-p10',
        label: 'P10',
        method: '',
        statement: String.raw`**Distributed loads (HS 4.9).** **(a)** A 6 m beam carries a load rising linearly from 2 kN/m at A to 5 kN/m at B. Find the
resultant and its distance from A.

**(b)** A 3 m beam carries $w = 4(x/3)^2$ kN/m, $x$ in m measured from the left end. Find the
resultant and its location by integration.

\fig{\FigTenA \FigTenB}`,
        solution: String.raw`**(a)** Split the trapezoid into a rectangle and a triangle.
Rectangle: $2(6) = 12.00$ kN at 3 m. Triangle: $\tfrac12(5-2)(6) = 9.000$ kN at
$\tfrac23(6) = 4$ m from A.

$$F_R = 21.00\text{ kN},\qquad \bar{x} = \frac{12(3) + 9(4)}{21} = 3.429\text{ m from A}$$

(b)

$$F_R = \int_0^3 \tfrac{4}{9}x^2\,dx = \tfrac{4}{9}\cdot\tfrac{27}{3} = 4.000\text{ kN},\qquad \int_0^3 x\cdot\tfrac49 x^2\,dx = \tfrac49\cdot\tfrac{81}{4} = 9.000\text{ kN}\cdot\text{m}$$

$\bar{x} = 9.000/4.000 = 2.250$ m. Spandrel check: $n = 2$, $w_0 = 4$ kN/m, $L = 3$ m gives
$F = w_0L/3 = 4.000$ kN at $\tfrac34L = 2.250$ m.

**Answer.** **(a)** 21.00 kN at 3.429 m from A (b) 4.000 kN at 2.250 m`,
        figure: 'practice/aer320/q10.svg',
        solutionFigure: 'practice/aer320/s10.svg',
      },
      {
        id: 'aer320-t1-p11',
        label: 'P11',
        method: '',
        statement: String.raw`**Wrench (HS 4.8, general case).** $\vec{F}_1 = \{400\hat{k}\}$ N at $(3, 0, 0)$ m, $\vec{F}_2 = \{300\hat{\imath}\}$ N at $(0, 2, 0)$ m and
$\vec{F}_3 = \{-200\hat{\jmath}\}$ N at $(3, 2, 0)$ m. Reduce the system to a wrench: find the resultant force,
the wrench couple moment, and the point $(x, y)$ where the wrench axis crosses the $xy$ plane.`,
        solution: String.raw`$$\vec{F}_R = \{300\hat{\imath} - 200\hat{\jmath} + 400\hat{k}\}\text{ N},\qquad F_R = 538.5\text{ N},\qquad \hat{u}_{F_R} = (0.5571, -0.3714, 0.7428)$$

Moments about O:
$(3,0,0)\times(0,0,400) = (0, -1200, 0)$;\
$(0,2,0)\times(300,0,0) = (0, 0, -600)$;\
$(3,2,0)\times(0,-200,0) = (0, 0, -600)$.

$$\vec{M}_{R_O} = \{-1200\hat{\jmath} - 1200\hat{k}\}\text{ N}\cdot\text{m}$$

Component along $\vec{F}_R$:
$M_\parallel = \vec{M}_{R_O}\cdot\hat{u}_{F_R} = (-1200)(-0.3714) + (-1200)(0.7428) = -445.7$ N$\cdot$m.
It is negative, so the wrench couple points opposite to $\vec{F}_R$ (a negative wrench), magnitude
445.7 N$\cdot$m.

Perpendicular part: $\vec{M}_\perp = \vec{M}_{R_O} - M_\parallel\hat{u}_{F_R} = \{248.3\hat{\imath} - 1365.5\hat{\jmath} - 869.0\hat{k}\}$ N$\cdot$m.
Find P $= (x, y, 0)$ with $\vec{r}_{OP}\times\vec{F}_R = \vec{M}_\perp$, where
$\vec{r}_{OP}\times\vec{F}_R = (400y,\ -400x,\ -200x - 300y)$:

$$400y = 248.3 \Rightarrow y = 0.6207\text{ m},\qquad -400x = -1365.5 \Rightarrow x = 3.414\text{ m}$$

Check the $\hat{k}$ row: $-200(3.414) - 300(0.6207) = -869.0$. It matches, which confirms the
arithmetic.

**Answer.** $\vec{F}_R = \{300\hat{\imath} - 200\hat{\jmath} + 400\hat{k}\}$ N (538.5 N); $M_\parallel = -445.7$ N$\cdot$m (opposite $\vec{F}_R$);
 $(3.414, 0.6207)$ m`,
        figure: 'practice/aer320/q11.svg',
      },
    ],
  },
]
