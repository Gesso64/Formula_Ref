import type { PracticeLab } from '@/types'

/* Generated from the MTH425 practice sets (labN-practice-set.md in the Aerospace Semester 3 repo).
   Text is Markdown with $…$ / $$…$$ KaTeX math, rendered by renderMarkdown in src/lib/markdown.ts. */

export const MTH425_LABS: PracticeLab[] = [
  {
    id: 'mth425-lab1',
    number: 1,
    title: 'Separable and first-order linear DEs',
    ref: 'Zill §2.2, 2.3',
    blurb: 'Hand-solving drill. Closed book, about 10 minutes per problem. Problems 1 to 4 are separable, problems 5 to 8 are linear. Every solution was checked by substituting back into the ODE.',
    intro: String.raw`**Separable.** $\dfrac{dy}{dx} = g(x)h(y)$. Steps:

1. Find the constants $y = b$ where $h(b) = 0$. Each is a solution, set aside.
2. Otherwise divide: $\dfrac{dy}{h(y)} = g(x)\,dx$, integrate both sides, add one constant $c$.
3. Solve for $y$ if possible. Check each constant solution against the general family: if no value of
   $c$ produces it, it is a **lost (singular) solution** and must be listed separately.

**Linear.** Standard form (coefficient of $y'$ equal to 1):

$$\frac{dy}{dx} + P(x)\,y = f(x)$$

| Step | Formula |
|---|---|
| integrating factor | $\mu(x) = e^{\int P(x)\,dx}$ (drop the constant of integration) |
| multiply through | $\dfrac{d}{dx}\big[\mu y\big] = \mu f$ |
| integrate | $\mu y = \displaystyle\int \mu f\,dx + c$, then divide by $\mu$ |

**Linear in $x$.** If $y$ appears nastily but $x$ appears to the first power, flip it:
$\dfrac{dx}{dy} + P(y)\,x = f(y)$.

**Interval of validity.** For a linear DE it is the largest interval containing the initial $x$
on which $P$ and $f$ are continuous. For a separable DE, it is the largest interval containing the
initial $x$ on which the solution formula is defined and still satisfies the DE (watch square roots,
logarithms, and denominators). Apply the initial condition to the **whole** general solution.`,
    pdf: 'practice/mth425/set1.pdf',
    problems: [
      {
        id: 'mth425-lab1-p1',
        label: 'P1',
        method: String.raw`separable, implicit answer`,
        statement: String.raw`$\dfrac{dy}{dx} = \dfrac{x^2}{y\,(1 + x^3)}$`,
        solution: String.raw`First order, and the right side is $g(x)\,h(y)$ with $g = \dfrac{x^2}{1 + x^3}$ and $h = \dfrac{1}{y}$,
so it is separable. There is no $y$ with $h(y) = 0$, so no constant solutions to set aside.

Separate and integrate:

$$y\,dy = \frac{x^2}{1 + x^3}\,dx \qquad\Longrightarrow\qquad \frac{y^2}{2} = \frac{1}{3}\ln|1 + x^3| + c_1$$

since $\dfrac{d}{dx}(1 + x^3) = 3x^2$. Multiply by 2 and absorb the constant:

$$\boxed{y^2 = \tfrac{2}{3}\ln|1 + x^3| + c}$$

The solution is left implicit. It is valid wherever the right side is positive, and $y \ne 0$ is
required because the ODE is undefined there.

Check: differentiate implicitly, $2yy' = \dfrac{2}{3}\cdot\dfrac{3x^2}{1 + x^3}$, so
$y' = \dfrac{x^2}{y(1 + x^3)}$.`,
      },
      {
        id: 'mth425-lab1-p2',
        label: 'P2',
        method: String.raw`separable with partial fractions and a lost solution`,
        statement: String.raw`$\dfrac{dy}{dx} = x\,(y^2 - 4)$`,
        solution: String.raw`Right side is $x$ times a function of $y$ alone, so it is separable. $h(y) = y^2 - 4 = 0$ gives two
constant solutions, $y = 2$ and $y = -2$. Set them aside.

Otherwise separate. Partial fractions: $\dfrac{1}{y^2 - 4} = \dfrac{1}{4}\left(\dfrac{1}{y - 2} - \dfrac{1}{y + 2}\right)$.

$$\frac{1}{4}\ln\left|\frac{y - 2}{y + 2}\right| = \frac{x^2}{2} + c_1
\qquad\Longrightarrow\qquad \frac{y - 2}{y + 2} = Ke^{2x^2}, \quad K = \pm e^{4c_1} \ne 0$$

Solve for $y$: $y - 2 = Ke^{2x^2}(y + 2)$, so $y\big(1 - Ke^{2x^2}\big) = 2\big(1 + Ke^{2x^2}\big)$.

**Lost solution.** Setting $K = 0$ in the family gives $y = 2$, so that constant is already
included once $K$ is allowed to be zero. But $y = -2$ would need $K \to \infty$. No finite $K$
produces it, so it is lost and has to be stated separately.

$$\boxed{y = \frac{2\big(1 + Ke^{2x^2}\big)}{1 - Ke^{2x^2}}\ \ (K \text{ any constant}), \qquad\text{and also}\quad y = -2}$$

With $u = Ke^{2x^2}$ the family is $y = 2(1 + u)/(1 - u)$. It is defined for all $x$ unless $u = 1$ somewhere,
which happens only for $0 < K \le 1$ (at $x = \pm\sqrt{\ln(1/K)/2}$). There the curve has a vertical
asymptote and each branch is a separate solution on its own interval.

Check: $y = -2$ gives $y' = 0 = x(4 - 4)$. For the family, $u' = 4xu$, so
$y' = \dfrac{4u'}{(1 - u)^2} = \dfrac{16xu}{(1 - u)^2}$, and $y^2 - 4 = \dfrac{16u}{(1 - u)^2}$, so $y' = x(y^2 - 4)$.`,
      },
      {
        id: 'mth425-lab1-p3',
        label: 'P3',
        method: String.raw`separable IVP with an interval of validity`,
        statement: String.raw`$(1 + e^{x})\,y\,\dfrac{dy}{dx} = e^{x}, \qquad y(0) = 1$`,
        solution: String.raw`Divide by $1 + e^x$ (never zero): $\dfrac{dy}{dx} = \dfrac{e^x}{1 + e^x}\cdot\dfrac{1}{y}$, which is
separable. Separate and integrate:

$$y\,dy = \frac{e^x}{1 + e^x}\,dx \qquad\Longrightarrow\qquad \frac{y^2}{2} = \ln(1 + e^x) + c_1$$

The log needs no absolute value, since $1 + e^x > 0$. Apply $y(0) = 1$: $\tfrac{1}{2} = \ln 2 + c_1$, so
$c_1 = \tfrac{1}{2} - \ln 2$. Then

$$y^2 = 1 + 2\ln\frac{1 + e^x}{2}$$

The initial value $y(0) = 1$ is positive, so take the positive root. Then for the solution to be real
and nonzero (the ODE has $y$ in the denominator after separating) we need

$$1 + 2\ln\frac{1 + e^x}{2} > 0 \iff \frac{1 + e^x}{2} > e^{-1/2} \iff x > \ln\!\big(2e^{-1/2} - 1\big) \approx -1.546$$

$$\boxed{y = \sqrt{1 + 2\ln\dfrac{1 + e^{x}}{2}}, \qquad x > \ln\!\big(2e^{-1/2} - 1\big)}$$

At the left endpoint $y \to 0$, where $y' \to \infty$: the solution curve has a vertical tangent and
cannot be continued, which is why the interval stops there.`,
      },
      {
        id: 'mth425-lab1-p4',
        label: 'P4',
        method: String.raw`separable, integration by parts`,
        statement: String.raw`$e^{y}\,\dfrac{dy}{dx} = x\sin x$`,
        solution: String.raw`Right side is a function of $x$ alone times 1, left side is $e^y\,y'$, so it is separable. No
constant solutions to set aside. Separate and integrate:

$$e^y\,dy = x\sin x\,dx$$

Left side integrates to $e^y$. For the right, integrate by parts with $u = x$, $dv = \sin x\,dx$,
so $du = dx$ and $v = -\cos x$:

$$\int x\sin x\,dx = -x\cos x + \int\cos x\,dx = \sin x - x\cos x$$

So $e^y = \sin x - x\cos x + c$. Take the log:

$$\boxed{y = \ln\big(\sin x - x\cos x + c\big)}$$

valid on any interval where $\sin x - x\cos x + c > 0$. The constant $c$ decides where that is, so an
initial condition $y(x_0) = y_0$ (which fixes $c = e^{y_0} - \sin x_0 + x_0\cos x_0$) also fixes the
interval: the largest one around $x_0$ on which the argument of the log stays positive.

Check: $y' = \dfrac{x\sin x}{\sin x - x\cos x + c}$ (since $\dfrac{d}{dx}(\sin x - x\cos x) = x\sin x$),
and $e^y y' = x\sin x$.`,
      },
      {
        id: 'mth425-lab1-p5',
        label: 'P5',
        method: String.raw`linear, nonconstant coefficients`,
        statement: String.raw`$x\,\dfrac{dy}{dx} + 4y = x^3 - x, \qquad x > 0$`,
        solution: String.raw`The unknown $y$ and $y'$ appear to the first power with coefficients depending on $x$ only, so it is
linear. It is not separable because of the $x^3 - x$ forcing term. Divide by $x$ to reach standard
form:

$$y' + \frac{4}{x}\,y = x^2 - 1$$

So $P = \dfrac{4}{x}$, $f = x^2 - 1$. Integrating factor for $x > 0$:

$$\mu = e^{\int 4/x\,dx} = e^{4\ln x} = x^4$$

Multiply through; the left side collapses to a product derivative:

$$\frac{d}{dx}\big[x^4y\big] = x^4(x^2 - 1) = x^6 - x^4
\qquad\Longrightarrow\qquad x^4y = \frac{x^7}{7} - \frac{x^5}{5} + c$$

$$\boxed{y = \frac{x^3}{7} - \frac{x}{5} + c\,x^{-4}, \qquad 0 < x < \infty}$$

The interval is $(0, \infty)$ because $P = 4/x$ is not continuous at $x = 0$.

Check: $xy' = \dfrac{3x^3}{7} - \dfrac{x}{5} - 4cx^{-4}$ and $4y = \dfrac{4x^3}{7} - \dfrac{4x}{5} + 4cx^{-4}$.
Adding gives $x^3 - x$.`,
      },
      {
        id: 'mth425-lab1-p6',
        label: 'P6',
        method: String.raw`linear, integration by parts twice`,
        statement: String.raw`$\dfrac{dy}{dx} + y = 5\sin 2x$`,
        solution: String.raw`Already in standard form with $P = 1$, $f = 5\sin 2x$. Integrating factor $\mu = e^{x}$. Then

$$\frac{d}{dx}\big[e^xy\big] = 5e^x\sin 2x$$

Integrate $\int e^x\sin 2x\,dx$ by parts twice. Call it $I$.

$$I = e^x\sin 2x - 2\int e^x\cos 2x\,dx = e^x\sin 2x - 2\Big(e^x\cos 2x + 2\int e^x\sin 2x\,dx\Big)$$

$$I = e^x\sin 2x - 2e^x\cos 2x - 4I \qquad\Longrightarrow\qquad I = \frac{e^x(\sin 2x - 2\cos 2x)}{5}$$

So $e^xy = e^x(\sin 2x - 2\cos 2x) + c$. Divide by $e^x$:

$$\boxed{y = \sin 2x - 2\cos 2x + c\,e^{-x}, \qquad -\infty < x < \infty}$$

The $ce^{-x}$ piece decays, so it is the transient. $\sin 2x - 2\cos 2x$ is the steady-state response.

Check: $y' = 2\cos 2x + 4\sin 2x - ce^{-x}$. Adding $y$ gives $5\sin 2x$.`,
      },
      {
        id: 'mth425-lab1-p7',
        label: 'P7',
        method: String.raw`linear IVP, trigonometric coefficients`,
        statement: String.raw`$\cos x\,\dfrac{dy}{dx} + (\sin x)\,y = 1, \qquad y(0) = 2$`,
        solution: String.raw`Linear in $y$. Divide by $\cos x$ to reach standard form (valid where $\cos x \ne 0$):

$$y' + (\tan x)\,y = \sec x$$

$P = \tan x$ and $f = \sec x$. The integrating factor on $-\pi/2 < x < \pi/2$:

$$\mu = e^{\int\tan x\,dx} = e^{\ln\sec x} = \sec x$$

$$\frac{d}{dx}\big[y\sec x\big] = \sec^2x \qquad\Longrightarrow\qquad y\sec x = \tan x + c$$

Multiply by $\cos x$: $y = \sin x + c\cos x$. Apply $y(0) = 2$: $0 + c = 2$, so $c = 2$.

$$\boxed{y = \sin x + 2\cos x, \qquad -\frac{\pi}{2} < x < \frac{\pi}{2}}$$

The interval comes from the continuity of $P = \tan x$ and $f = \sec x$ around the starting point
$x = 0$: they break at $\pm\pi/2$. The formula $\sin x + 2\cos x$ would itself make sense for all
$x$, but the theorem only guarantees the DE in standard form holds on this interval.

Check: $y' = \cos x - 2\sin x$, so $\cos x\,y' + \sin x\,y = \cos^2x - 2\sin x\cos x + \sin^2x + 2\sin x\cos x = 1$.`,
      },
      {
        id: 'mth425-lab1-p8',
        label: 'P8',
        method: String.raw`linear in $x$, so write $x$ as a function of $y$`,
        statement: String.raw`$y\,dx - 4\,(x + y^6)\,dy = 0, \qquad y > 0$`,
        solution: String.raw`In the form $\dfrac{dy}{dx} = \dots$ this is nasty: $\dfrac{dy}{dx} = \dfrac{y}{4(x + y^6)}$ is neither
separable nor linear in $y$. But $x$ appears to the first power, so flip it. Divide by $y$ and by $dy$:

$$\frac{dx}{dy} = \frac{4(x + y^6)}{y} \qquad\Longrightarrow\qquad \frac{dx}{dy} - \frac{4}{y}\,x = 4y^5$$

Now $x(y)$ is the unknown, $P = -\dfrac{4}{y}$, $f = 4y^5$. For $y > 0$:

$$\mu = e^{-4\int dy/y} = e^{-4\ln y} = y^{-4}$$

$$\frac{d}{dy}\big[y^{-4}x\big] = y^{-4}\cdot 4y^5 = 4y \qquad\Longrightarrow\qquad y^{-4}x = 2y^2 + c$$

$$\boxed{x = 2y^6 + c\,y^4, \qquad y > 0}$$

This is $x$ as a function of $y$, which is an acceptable (explicit) solution of the original
differential form.

Check: $\dfrac{dx}{dy} = 12y^5 + 4cy^3$ and $\dfrac{4(x + y^6)}{y} = \dfrac{4(3y^6 + cy^4)}{y} = 12y^5 + 4cy^3$.`,
      },
    ],
  },
  {
    id: 'mth425-lab2',
    number: 2,
    title: 'Exact equations and substitution',
    ref: 'Zill §2.4, 2.5',
    blurb: 'Quiz prep. Closed book, about 10 minutes per problem. Eight problems, one per method, with the last one solvable two ways. Classify first, then solve, then check by differentiating the answer. Every solution was checked independently.',
    intro: String.raw`**Exact.** Write the equation as $M\,dx + N\,dy = 0$. It is exact when $M_y = N_x$. Then
$F = \int M\,dx + g(y)$, and $g$ comes from $F_y = N$. The answer is $F(x,y) = c$.

**Not exact: integrating factor.** Multiply through by $\mu$ and test again.

- If $\dfrac{M_y - N_x}{N}$ depends on $x$ only: $\ \mu(x) = \exp\!\Big(\displaystyle\int \dfrac{M_y - N_x}{N}\,dx\Big)$
- If $\dfrac{N_x - M_y}{M}$ depends on $y$ only: $\ \mu(y) = \exp\!\Big(\displaystyle\int \dfrac{N_x - M_y}{M}\,dy\Big)$

Check whether $\mu$ lost a solution (a line where $\mu$ is undefined or zero).

**Substitutions.**

| Form | Substitution | Result |
|---|---|---|
| homogeneous: $y' = f(y/x)$, or $M, N$ of equal degree | $y = ux,\ \ y' = u + xu'$ | separable in $u, x$ |
| Bernoulli: $y' + P(x)y = f(x)y^n,\ n \ne 0, 1$ | $u = y^{1-n}$ | linear: $u' + (1-n)Pu = (1-n)f$ |
| $y' = f(Ax + By + C),\ B \ne 0$ | $u = Ax + By + C,\ \ u' = A + By'$ | separable: $u' = A + Bf(u)$ |

Go back to $y$ at the end. State where the answer is valid.`,
    pdf: 'practice/mth425/set2.pdf',
    problems: [
      {
        id: 'mth425-lab2-p1',
        label: 'P1',
        method: String.raw`plain exact`,
        statement: String.raw`$(2xy^2 + e^x)\,dx + (2x^2y - 3y^2)\,dy = 0$`,
        solution: String.raw`Differential form with $M = 2xy^2 + e^x$ and $N = 2x^2y - 3y^2$. Test:

$$M_y = 4xy, \qquad N_x = 4xy$$

They match, so the equation is exact and a function $F$ exists with $F_x = M$ and $F_y = N$.

Integrate $M$ with respect to $x$ (treat $y$ as a constant) and add an unknown function of $y$:

$$F = \int (2xy^2 + e^x)\,dx = x^2y^2 + e^x + g(y)$$

Differentiate in $y$ and match $N$:

$$F_y = 2x^2y + g'(y) = 2x^2y - 3y^2 \quad\Longrightarrow\quad g'(y) = -3y^2,\quad g(y) = -y^3$$

$$\boxed{x^2y^2 + e^x - y^3 = c}$$

Check: $F_x = 2xy^2 + e^x = M$ and $F_y = 2x^2y - 3y^2 = N$. The solution is implicit and
valid wherever it defines $y$ as a differentiable function of $x$, which fails where
$N = 0$.`,
      },
      {
        id: 'mth425-lab2-p2',
        label: 'P2',
        method: String.raw`exact initial value problem`,
        statement: String.raw`$\left(\dfrac{y}{x} + 6x\right)dx + (\ln x - 2)\,dy = 0, \qquad y(1) = 5$`,
        solution: String.raw`Here $M = y/x + 6x$ and $N = \ln x - 2$, defined for $x > 0$. Test:

$$M_y = \frac{1}{x}, \qquad N_x = \frac{1}{x}$$

Exact. Integrate $M$ in $x$:

$$F = \int\left(\frac{y}{x} + 6x\right)dx = y\ln x + 3x^2 + g(y)$$

$$F_y = \ln x + g'(y) = \ln x - 2 \quad\Longrightarrow\quad g(y) = -2y$$

So the general solution is $y\ln x + 3x^2 - 2y = c$. Apply $y(1) = 5$ to the whole expression:

$$5(0) + 3 - 10 = c \quad\Longrightarrow\quad c = -7$$

Solve for $y$, which is possible here because $y$ appears linearly:

$$y(\ln x - 2) = -7 - 3x^2$$

$$\boxed{y = \frac{3x^2 + 7}{2 - \ln x}, \qquad 0 < x < e^2}$$

Check: $y(1) = 10/2 = 5$. The interval is the one that contains $x = 1$: it needs
$x > 0$ for $\ln x$ and $1/x$, and $2 - \ln x \ne 0$ rules out $x = e^2$.`,
      },
      {
        id: 'mth425-lab2-p3',
        label: 'P3',
        method: String.raw`integrating factor in $x$`,
        statement: String.raw`$y\,dx + (x^2y - x)\,dy = 0$`,
        solution: String.raw`$M = y$ and $N = x^2y - x$.

$$M_y = 1, \qquad N_x = 2xy - 1$$

Not exact. Try the $x$ test first:

$$\frac{M_y - N_x}{N} = \frac{2 - 2xy}{x^2y - x} = \frac{-2(xy - 1)}{x(xy - 1)} = -\frac{2}{x}$$

That depends on $x$ only. (The $y$ test gives $(N_x - M_y)/M = (2xy - 2)/y$, which still has
an $x$ in it, so it fails.)

$$\mu(x) = \exp\!\left(-2\int\frac{dx}{x}\right) = x^{-2}$$

Multiply through:

$$\frac{y}{x^2}\,dx + \left(y - \frac{1}{x}\right)dy = 0$$

Recheck: $M_y = 1/x^2$ and $N_x = 1/x^2$. Exact now. Integrate $M$ in $x$:

$$F = -\frac{y}{x} + g(y), \qquad F_y = -\frac{1}{x} + g'(y) = y - \frac{1}{x} \quad\Longrightarrow\quad g(y) = \frac{y^2}{2}$$

$$\boxed{\frac{y^2}{2} - \frac{y}{x} = c, \qquad x \ne 0}$$

Check: $F_x = y/x^2 = \mu M$ and $F_y = y - 1/x = \mu N$.

Lost solution: $x = 0$ satisfies the original equation ($dx = 0$ and $x^2y - x = 0$ there) but
$\mu = x^{-2}$ is undefined on it. The line $y = 0$ is a solution too and is contained in
the family at $c = 0$.`,
      },
      {
        id: 'mth425-lab2-p4',
        label: 'P4',
        method: String.raw`integrating factor in $y$`,
        statement: String.raw`$y\,dx + (2x - ye^{y})\,dy = 0$`,
        solution: String.raw`$M = y$ and $N = 2x - ye^y$.

$$M_y = 1, \qquad N_x = 2$$

Not exact. The $x$ test gives $(M_y - N_x)/N = -1/(2x - ye^y)$, which depends on both
variables, so it fails. The $y$ test:

$$\frac{N_x - M_y}{M} = \frac{2 - 1}{y} = \frac{1}{y}$$

$$\mu(y) = \exp\!\left(\int\frac{dy}{y}\right) = y$$

Multiply through:

$$y^2\,dx + (2xy - y^2e^y)\,dy = 0$$

Recheck: $M_y = 2y$ and $N_x = 2y$. Exact. Integrate $M$ in $x$:

$$F = xy^2 + g(y), \qquad F_y = 2xy + g'(y) = 2xy - y^2e^y \quad\Longrightarrow\quad g'(y) = -y^2e^y$$

Two integrations by parts give $\int y^2e^y\,dy = e^y(y^2 - 2y + 2)$, so

$$\boxed{xy^2 - e^y(y^2 - 2y + 2) = c}$$

Check: $F_x = y^2 = \mu M$ and
$F_y = 2xy - e^y(y^2 - 2y + 2) - e^y(2y - 2) = 2xy - y^2e^y = \mu N$.

The factor $\mu = y$ vanishes on $y = 0$. That line still satisfies the original equation
($dy = 0$ and $M = 0$), so nothing was lost.`,
      },
      {
        id: 'mth425-lab2-p5',
        label: 'P5',
        method: String.raw`homogeneous`,
        statement: String.raw`$x\dfrac{dy}{dx} = y + xe^{y/x}, \qquad x > 0$`,
        solution: String.raw`Divide by $x$: $\dfrac{dy}{dx} = \dfrac{y}{x} + e^{y/x}$. The right side depends on $y/x$ only,
so the equation is homogeneous. Let $y = ux$, so $y' = u + xu'$:

$$u + xu' = u + e^u \quad\Longrightarrow\quad xu' = e^u$$

Separate and integrate:

$$e^{-u}\,du = \frac{dx}{x} \quad\Longrightarrow\quad -e^{-u} = \ln x + c$$

Write $e^{-u} = C - \ln x$ with $C = -c$. Then $u = -\ln(C - \ln x)$ and $y = ux$:

$$\boxed{y = -x\ln(C - \ln x), \qquad 0 < x < e^{C}}$$

Check: $y' = -\ln(C - \ln x) + \dfrac{1}{C - \ln x}$. On the other side,
$\dfrac{y}{x} + e^{y/x} = -\ln(C - \ln x) + \dfrac{1}{C - \ln x}$. They agree. The interval comes from
needing $C - \ln x > 0$. Since $e^u$ is never zero, no constant solution was divided out.`,
      },
      {
        id: 'mth425-lab2-p6',
        label: 'P6',
        method: String.raw`Bernoulli`,
        statement: String.raw`$x\dfrac{dy}{dx} + y = x^2y^3, \qquad y(1) = \dfrac{1}{2}$`,
        solution: String.raw`Divide by $x$ to reach standard form:

$$y' + \frac{1}{x}\,y = x\,y^3$$

This is Bernoulli with $P = 1/x$, $f = x$ and $n = 3$. Use $u = y^{1-n} = y^{-2}$, so
$u' = -2y^{-3}y'$. Divide the equation by $y^3$ and substitute:

$$y^{-3}y' + \frac{1}{x}y^{-2} = x \quad\Longrightarrow\quad -\frac{1}{2}u' + \frac{1}{x}u = x$$

Multiply by $-2$ to get the linear form $u' + (1-n)Pu = (1-n)f$:

$$u' - \frac{2}{x}\,u = -2x$$

Integrating factor: $\exp\!\big(-2\int dx/x\big) = x^{-2}$. Then

$$\frac{d}{dx}\big(x^{-2}u\big) = -\frac{2}{x} \quad\Longrightarrow\quad x^{-2}u = -2\ln x + c \quad\Longrightarrow\quad u = x^2(c - 2\ln x)$$

Return to $y$: $y^{-2} = x^2(c - 2\ln x)$. Apply $y(1) = \tfrac{1}{2}$, so $u(1) = 4$ and
$c = 4$. The initial value is positive, so take the positive root:

$$\boxed{y = \frac{1}{x\sqrt{4 - 2\ln x}}, \qquad 0 < x < e^2}$$

Check: $y(1) = 1/\sqrt{4} = 1/2$. The interval needs $x > 0$ and $4 - 2\ln x > 0$.
Dividing by $y^3$ lost the solution $y = 0$; it is not this IVP's solution.`,
      },
      {
        id: 'mth425-lab2-p7',
        label: 'P7',
        method: String.raw`substitution $u = Ax + By + C$`,
        statement: String.raw`$\dfrac{dy}{dx} = \tan^2(x + y)$`,
        solution: String.raw`The right side is a function of $x + y$ alone, so let $u = x + y$. Then $u' = 1 + y'$:

$$u' = 1 + \tan^2u = \sec^2u$$

Separable:

$$\cos^2u\,du = dx \quad\Longrightarrow\quad \frac{u}{2} + \frac{\sin 2u}{4} = x + c$$

Multiply by 4 and put $u = x + y$ back:

$$2(x + y) + \sin\big(2(x + y)\big) = 4x + c_1$$

$$\boxed{2y - 2x + \sin(2x + 2y) = c_1}$$

Check by differentiating implicitly, with $F = 2y - 2x + \sin(2x + 2y)$:

$$F_x = -2 + 2\cos(2x + 2y), \qquad F_y = 2 + 2\cos(2x + 2y)$$

$$y' = -\frac{F_x}{F_y} = \frac{1 - \cos(2x + 2y)}{1 + \cos(2x + 2y)} = \tan^2(x + y)$$

using $1 - \cos 2\theta = 2\sin^2\theta$ and $1 + \cos 2\theta = 2\cos^2\theta$.`,
      },
      {
        id: 'mth425-lab2-p8',
        label: 'P8',
        method: String.raw`two methods, same answer`,
        statement: String.raw`$(3xy + y^2)\,dx + (x^2 + xy)\,dy = 0$`,
        solution: String.raw`$M = 3xy + y^2$ and $N = x^2 + xy$. Test for exactness first:

$$M_y = 3x + 2y, \qquad N_x = 2x + y$$

Not exact. But $M$ and $N$ are both homogeneous of degree 2, and the $x$ test also works. Two
routes.

**Method A: integrating factor in $x$.**

$$\frac{M_y - N_x}{N} = \frac{x + y}{x(x + y)} = \frac{1}{x} \quad\Longrightarrow\quad \mu = \exp\!\int\frac{dx}{x} = x$$

Multiply through: $(3x^2y + xy^2)\,dx + (x^3 + x^2y)\,dy = 0$. Now $M_y = 3x^2 + 2xy = N_x$.

$$F = x^3y + \frac{x^2y^2}{2} + g(y), \qquad F_y = x^3 + x^2y + g'(y) = x^3 + x^2y \quad\Longrightarrow\quad g' = 0$$

So $x^3y + \tfrac{1}{2}x^2y^2 = c$, or equivalently $x^2y^2 + 2x^3y = C$.

**Method B: homogeneous substitution.** With $y = ux$ and $dy/dx = -M/N$, divide numerator and
denominator by $x^2$:

$$u + xu' = -\frac{3u + u^2}{1 + u} \quad\Longrightarrow\quad xu' = -\frac{3u + u^2 + u + u^2}{1 + u} = -\frac{2u(u + 2)}{1 + u}$$

Separate and split with partial fractions, $\dfrac{1 + u}{u(u + 2)} = \dfrac{1}{2}\left(\dfrac{1}{u} + \dfrac{1}{u + 2}\right)$:

$$\frac{1}{2}\left(\frac{1}{u} + \frac{1}{u + 2}\right)du = -\frac{2\,dx}{x} \quad\Longrightarrow\quad \frac{1}{2}\ln|u(u + 2)| = -2\ln|x| + c$$

Exponentiate to get $u(u + 2)\,x^4 = C$, then use $u = y/x$:

$$\frac{y}{x}\left(\frac{y}{x} + 2\right)x^4 = x^2y(y + 2x) = C$$

$$\boxed{x^2y^2 + 2x^3y = C}$$

Both routes give the same family. Method A is shorter because the integration is trivial;
method B needs the partial fractions but needs no test to find $\mu$. The line $y = 0$ and
the line $y = -2x$ (where $u = 0$ and $u = -2$ were divided out) are solutions and sit
inside the family at $C = 0$, since $x^2y(y + 2x) = 0$.

Check: $F = x^2y^2 + 2x^3y$ has $F_x = 2xy^2 + 6x^2y = 2x\,(y^2 + 3xy)$ and
$F_y = 2x^2y + 2x^3 = 2x\,(x^2 + xy)$, which are $2x\,M$ and $2x\,N$.
So $F_x\,dx + F_y\,dy = 2x\,(M\,dx + N\,dy) = 0$.`,
      },
    ],
  },
  {
    id: 'mth425-lab3',
    number: 3,
    title: 'First-order DEs, all types',
    ref: 'Zill §2.2–2.5',
    blurb: 'Zill §2.2 to 2.5. Quiz prep. Closed book, about 10 minutes per problem. The equations are in no particular order and none of them is labelled. For each one, name the type and say why before you start solving; that is the skill this quiz tests. Some fit more than one type. Every solution was checked by substituting back.',
    intro: String.raw`**Which type is it? Check in this order.**

| Type | Test | Method |
|---|---|---|
| Separable | $y' = g(x)h(y)$ | $\int dy/h = \int g\,dx$; check $h(y) = 0$ for lost solutions |
| Linear | $y' + P(x)y = f(x)$ | $\mu = e^{\int P\,dx}$, then $(\mu y)' = \mu f$ |
| Exact | $M\,dx + N\,dy = 0$ with $M_y = N_x$ | $F = \int M\,dx + g(y)$, set $F_y = N$; answer $F = C$ |
| Not exact, $\mu(x)$ | $(M_y - N_x)/N$ depends on $x$ only | $\mu = e^{\int (M_y - N_x)/N\,dx}$ |
| Not exact, $\mu(y)$ | $(N_x - M_y)/M$ depends on $y$ only | $\mu = e^{\int (N_x - M_y)/M\,dy}$ |
| Homogeneous | $f(tx, ty) = f(x, y)$ | $y = ux$, so $y' = u + xu'$; separable in $u$ and $x$ |
| Bernoulli | $y' + Py = fy^n$ | $u = y^{1-n}$; linear in $u$ |
| $f(Ax + By + C)$ | $y'$ depends only on $Ax + By + C$ | $u = Ax + By + C$; separable |

**Finish.** Apply initial conditions last. State the interval of validity and any singular
solutions.`,
    pdf: 'practice/mth425/set3.pdf',
    problems: [
      {
        id: 'mth425-lab3-p1',
        label: 'P1',
        method: String.raw`Bernoulli, $n = 2$`,
        statement: String.raw`$\displaystyle x\frac{dy}{dx} + y = x^2y^2$`,
        solution: String.raw`It looks linear, but the $y^2$ on the right rules that out. Divide by $x$:
$y' + \tfrac{1}{x}y = xy^2$, a Bernoulli equation with $n = 2$.

Let $u = y^{1-2} = y^{-1}$, so $y = u^{-1}$ and $y' = -u^{-2}u'$. Substituting and multiplying
through by $-u^2/x$:

$$u' - \frac{1}{x}u = -x$$

That is linear in $u$. The integrating factor is $e^{-\int dx/x} = 1/x$:

$$\left(\frac{u}{x}\right)' = -1 \quad\Longrightarrow\quad \frac{u}{x} = -x + C \quad\Longrightarrow\quad u = Cx - x^2$$

$$\boxed{y = \frac{1}{Cx - x^2}}$$

$y = 0$ also solves the equation, and no value of $C$ gives it: it is a **singular solution**,
lost when we divided by $y^2$.`,
      },
      {
        id: 'mth425-lab3-p2',
        label: 'P2',
        method: String.raw`exact`,
        statement: String.raw`$(2xy + \cos y)\,dx + (x^2 - x\sin y + 2y)\,dy = 0$`,
        solution: String.raw`$M = 2xy + \cos y$ and $N = x^2 - x\sin y + 2y$, so $M_y = 2x - \sin y = N_x$. Exact.

$$F = \int M\,dx = x^2y + x\cos y + g(y)$$
$$F_y = x^2 - x\sin y + g'(y) = N \quad\Longrightarrow\quad g'(y) = 2y,\ g = y^2$$

$$\boxed{x^2y + x\cos y + y^2 = C}$$`,
      },
      {
        id: 'mth425-lab3-p3',
        label: 'P3',
        method: String.raw`substitution, $u = x + y + 1$`,
        statement: String.raw`$\displaystyle \frac{dy}{dx} = (x + y + 1)^2$`,
        solution: String.raw`The right side is a function of $x + y + 1$ alone. Let $u = x + y + 1$, so $u' = 1 + y'$:

$$u' = 1 + u^2 \quad\Longrightarrow\quad \int\frac{du}{1 + u^2} = \int dx \quad\Longrightarrow\quad \tan^{-1}u = x + C$$

$$\boxed{y = \tan(x + C) - x - 1}$$

$1 + u^2$ is never zero, so there are no constant or singular solutions to worry about.`,
      },
      {
        id: 'mth425-lab3-p4',
        label: 'P4',
        method: String.raw`linear IVP`,
        statement: String.raw`$\displaystyle x\frac{dy}{dx} + 2y = \sin x, \qquad y(\pi) = 0$`,
        solution: String.raw`Standard form: $y' + \tfrac{2}{x}y = \tfrac{\sin x}{x}$. $P = 2/x$, so $\mu = e^{2\ln x} = x^2$
(taking $x > 0$, since the initial point $x = \pi$ is positive). Multiplying the *original*
equation by $x$ gives the same thing directly:

$$x^2y' + 2xy = (x^2y)' = x\sin x$$

Integration by parts: $\int x\sin x\,dx = \sin x - x\cos x + C$. So
$x^2y = \sin x - x\cos x + C$.

Apply $y(\pi) = 0$: $0 = 0 - \pi(-1) + C$, so $C = -\pi$.

$$\boxed{y = \frac{\sin x - x\cos x - \pi}{x^2}, \qquad 0 < x < \infty}$$

$P(x) = 2/x$ is discontinuous at $x = 0$, so the interval of validity is the one containing
$x = \pi$.`,
      },
      {
        id: 'mth425-lab3-p5',
        label: 'P5',
        method: String.raw`homogeneous`,
        statement: String.raw`$\displaystyle \frac{dy}{dx} = \frac{x^2 + y^2}{xy}$`,
        solution: String.raw`Numerator and denominator are both degree 2, so $f(tx, ty) = f(x, y)$. Let $y = ux$, so
$y' = u + xu'$:

$$u + xu' = \frac{1 + u^2}{u} = \frac{1}{u} + u \quad\Longrightarrow\quad xu' = \frac{1}{u}$$

Separable: $u\,du = dx/x$, so $\tfrac{1}{2}u^2 = \ln|x| + C$. Put $u = y/x$ back:

$$\boxed{y^2 = 2x^2\ln|x| + cx^2}$$`,
      },
      {
        id: 'mth425-lab3-p6',
        label: 'P6',
        method: String.raw`separable, with a singular solution`,
        statement: String.raw`$\displaystyle \frac{dy}{dx} = \frac{y^2 - 1}{x}$. Find the general solution and any singular solutions.`,
        solution: String.raw`$\dfrac{dy}{y^2 - 1} = \dfrac{dx}{x}$, which is only allowed if $y \neq \pm 1$. Partial fractions:

$$\frac{1}{y^2 - 1} = \frac{1}{2}\left(\frac{1}{y - 1} - \frac{1}{y + 1}\right)$$

$$\frac{1}{2}\ln\left|\frac{y - 1}{y + 1}\right| = \ln|x| + C \quad\Longrightarrow\quad \frac{y - 1}{y + 1} = cx^2$$

$$\boxed{y = \frac{1 + cx^2}{1 - cx^2}}$$

Now check the constant solutions you divided out. $y = 1$ is the family with $c = 0$, so it is
already included. **$y = -1$ is a singular solution**: no finite $c$ produces it.`,
      },
      {
        id: 'mth425-lab3-p7',
        label: 'P7',
        method: String.raw`not exact, integrating factor $\mu(y) = y^3$`,
        statement: String.raw`$xy\,dx + (2x^2 + 3y^2 - 6)\,dy = 0$`,
        solution: String.raw`$M = xy$ and $N = 2x^2 + 3y^2 - 6$, so $M_y = x$ and $N_x = 4x$. Not exact.

$(M_y - N_x)/N = -3x/(2x^2 + 3y^2 - 6)$ depends on both variables, so no $\mu(x)$.
$(N_x - M_y)/M = 3x/(xy) = 3/y$ depends on $y$ only, so

$$\mu(y) = e^{\int 3/y\,dy} = y^3$$

The equation becomes $xy^4\,dx + (2x^2y^3 + 3y^5 - 6y^3)\,dy = 0$. Check: both partials are
$4xy^3$, so it is exact now.

$$F = \int xy^4\,dx = \tfrac{1}{2}x^2y^4 + h(y), \qquad F_y = 2x^2y^3 + h'(y) \quad\Longrightarrow\quad h'(y) = 3y^5 - 6y^3$$

$h = \tfrac{1}{2}y^6 - \tfrac{3}{2}y^4$. Multiply through by 2:

$$\boxed{x^2y^4 + y^6 - 3y^4 = c}$$`,
      },
      {
        id: 'mth425-lab3-p8',
        label: 'P8',
        method: String.raw`both separable and linear`,
        statement: String.raw`$\displaystyle \frac{dy}{dx} = 2xy + x, \qquad y(0) = 1$. Solve it two different ways.`,
        solution: String.raw`**As linear:** $y' - 2xy = x$. $\mu = e^{-x^2}$:

$$\left(ye^{-x^2}\right)' = xe^{-x^2} \quad\Longrightarrow\quad ye^{-x^2} = -\tfrac{1}{2}e^{-x^2} + C \quad\Longrightarrow\quad y = -\tfrac{1}{2} + Ce^{x^2}$$

**As separable:** the right side factors as $x(2y + 1)$, so

$$\int\frac{dy}{2y + 1} = \int x\,dx \quad\Longrightarrow\quad \tfrac{1}{2}\ln|2y + 1| = \tfrac{1}{2}x^2 + C \quad\Longrightarrow\quad 2y + 1 = Ae^{x^2}$$

Same family. Apply $y(0) = 1$: $1 = -\tfrac{1}{2} + C$, so $C = \tfrac{3}{2}$.

$$\boxed{y = \frac{3e^{x^2} - 1}{2}, \qquad -\infty < x < \infty}$$

On the quiz, go with whichever route you will make fewer mistakes on. Here the separable route
is shorter.`,
      },
    ],
  },
  {
    id: 'mth425-lab4',
    number: 4,
    title: 'Undetermined coefficients',
    ref: 'Zill §3.4',
    blurb: 'Quiz prep. Closed book, about 10 minutes per problem. Part A (problems 1 to 8): solve. Part B: write the form of $y_p$ only, or say the method does not apply and why. Every solution was checked by substituting back.',
    intro: String.raw`**Homogeneous part.** For $ay'' + by' + cy = 0$ solve $am^2 + bm + c = 0$:

| Roots | $y_c$ |
|---|---|
| distinct real $m_1, m_2$ | $c_1e^{m_1x} + c_2e^{m_2x}$ |
| repeated real $m$ | $(c_1 + c_2x)e^{mx}$ |
| complex $\alpha \pm \beta i$ | $e^{\alpha x}(c_1\cos\beta x + c_2\sin\beta x)$ |

**Guess for $y_p$.**

| $g(x)$ | $y_p$ |
|---|---|
| constant | $A$ |
| polynomial of degree $n$ | $A_nx^n + \dots + A_1x + A_0$ (every power) |
| $e^{ax}$ | $Ae^{ax}$ |
| $\cos\beta x$ or $\sin\beta x$ | $A\cos\beta x + B\sin\beta x$ (always both) |
| product of the above | product of the guesses |
| sum of the above | solve each piece separately, then add |

**Overlap rule.** If any term of the guess also appears in $y_c$, multiply the whole guess by
$x^s$, where $s$ is the smallest integer that removes every overlap (the multiplicity of the
matching root).

**Finish.** $y = y_c + y_p$. Apply initial conditions last, to the whole $y$.`,
    pdf: 'practice/mth425/set4.pdf',
    problems: [
      {
        id: 'mth425-lab4-p1',
        label: 'P1',
        method: String.raw`polynomial forcing, no overlap`,
        statement: String.raw`$y'' + 3y' + 2y = 6x^2 - 3$`,
        solution: String.raw`Second order, linear, constant coefficients. $m^2 + 3m + 2 = (m + 1)(m + 2) = 0$, so

$$y_c = c_1e^{-x} + c_2e^{-2x}$$

Try the full quadratic $y_p = Ax^2 + Bx + C$. Zero is not a root, so there is no overlap. Then
$y_p' = 2Ax + B$ and $y_p'' = 2A$:

$$2A + 3(2Ax + B) + 2(Ax^2 + Bx + C) = 2Ax^2 + (6A + 2B)x + (2A + 3B + 2C)$$

Match against $6x^2 + 0x - 3$:

$$2A = 6,\qquad 6A + 2B = 0,\qquad 2A + 3B + 2C = -3$$

So $A = 3$, $B = -9$, and $6 - 27 + 2C = -3$ gives $C = 9$.

$$\boxed{y = c_1e^{-x} + c_2e^{-2x} + 3x^2 - 9x + 9, \qquad -\infty < x < \infty}$$

The $Bx$ term is needed even though $g$ has no $x$ term. Leave it out and the $x$ terms on the
left have nothing to balance them.`,
      },
      {
        id: 'mth425-lab4-p2',
        label: 'P2',
        method: String.raw`exponential forcing, no overlap`,
        statement: String.raw`$y'' - 2y' - 3y = 6e^{2x}$`,
        solution: String.raw`$m^2 - 2m - 3 = (m - 3)(m + 1) = 0$, so $y_c = c_1e^{3x} + c_2e^{-x}$.

The forcing is $e^{2x}$ and $2$ is not a root, so $y_p = Ae^{2x}$ with no modification:

$$(4A - 4A - 3A)e^{2x} = -3Ae^{2x} = 6e^{2x} \quad\Longrightarrow\quad A = -2$$

$$\boxed{y = c_1e^{3x} + c_2e^{-x} - 2e^{2x}}$$`,
      },
      {
        id: 'mth425-lab4-p3',
        label: 'P3',
        method: String.raw`sine and cosine together`,
        statement: String.raw`$y'' - y' - 2y = 10\cos x$`,
        solution: String.raw`$m^2 - m - 2 = (m - 2)(m + 1) = 0$, so $y_c = c_1e^{2x} + c_2e^{-x}$.

The forcing is only a cosine, but the $y'$ term turns cosine into sine, so the guess needs both:
$y_p = A\cos x + B\sin x$. The roots are real, so $\pm i$ is not a root and there is no overlap.

$$y_p' = -A\sin x + B\cos x, \qquad y_p'' = -A\cos x - B\sin x$$

Collect the $\cos x$ and $\sin x$ terms of $y_p'' - y_p' - 2y_p$:

$$\cos x:\ -A - B - 2A = -3A - B = 10 \qquad\qquad \sin x:\ -B + A - 2B = A - 3B = 0$$

The second gives $A = 3B$, then $-10B = 10$, so $B = -1$ and $A = -3$.

$$\boxed{y = c_1e^{2x} + c_2e^{-x} - 3\cos x - \sin x}$$`,
      },
      {
        id: 'mth425-lab4-p4',
        label: 'P4',
        method: String.raw`resonance with a simple root`,
        statement: String.raw`$y'' - 3y' + 2y = 4e^{x}$`,
        solution: String.raw`$m^2 - 3m + 2 = (m - 1)(m - 2) = 0$, so $y_c = c_1e^{x} + c_2e^{2x}$.

The forcing $e^x$ is already a term of $y_c$ ($m = 1$ is a simple root). The naive guess $Ae^x$
would make the left side zero, so multiply by $x$: $y_p = Axe^x$.

$$y_p' = A(x + 1)e^x, \qquad y_p'' = A(x + 2)e^x$$

$$Ae^x\big[(x + 2) - 3(x + 1) + 2x\big] = -Ae^x = 4e^x \quad\Longrightarrow\quad A = -4$$

$$\boxed{y = c_1e^{x} + c_2e^{2x} - 4xe^{x}}$$`,
      },
      {
        id: 'mth425-lab4-p5',
        label: 'P5',
        method: String.raw`repeated root, so $x^2$`,
        statement: String.raw`$y'' - 6y' + 9y = 4e^{3x}$`,
        solution: String.raw`$m^2 - 6m + 9 = (m - 3)^2 = 0$, so $y_c = (c_1 + c_2x)e^{3x}$.

Now *both* $e^{3x}$ and $xe^{3x}$ are in $y_c$. Multiplying the guess once by $x$ gives $Axe^{3x}$,
which is still a term of $y_c$. It has to be $x^2$: $y_p = Ax^2e^{3x}$.

$$y_p' = A(2x + 3x^2)e^{3x}, \qquad y_p'' = A(2 + 12x + 9x^2)e^{3x}$$

$$Ae^{3x}\big[(2 + 12x + 9x^2) - 6(2x + 3x^2) + 9x^2\big] = 2Ae^{3x} = 4e^{3x} \quad\Longrightarrow\quad A = 2$$

$$\boxed{y = (c_1 + c_2x)e^{3x} + 2x^2e^{3x}}$$`,
      },
      {
        id: 'mth425-lab4-p6',
        label: 'P6',
        method: String.raw`complex roots, forcing at the natural frequency`,
        statement: String.raw`$y'' + 9y = 12\cos 3x$`,
        solution: String.raw`$m^2 + 9 = 0$ gives $m = \pm 3i$, so $y_c = c_1\cos 3x + c_2\sin 3x$.

The forcing $\cos 3x$ and the guess $A\cos 3x + B\sin 3x$ both sit inside $y_c$, so the whole pair
gets an $x$: $y_p = x(A\cos 3x + B\sin 3x)$.

$$y_p'' = 2(-3A\sin 3x + 3B\cos 3x) + x(-9A\cos 3x - 9B\sin 3x)$$

The terms with a factor of $x$ cancel against $9y_p$, leaving

$$y_p'' + 9y_p = -6A\sin 3x + 6B\cos 3x = 12\cos 3x \quad\Longrightarrow\quad A = 0,\ B = 2$$

$$\boxed{y = c_1\cos 3x + c_2\sin 3x + 2x\sin 3x}$$

The $2x\sin 3x$ term grows without bound. That is resonance, and it is why the $x$ factor is
unavoidable.`,
      },
      {
        id: 'mth425-lab4-p7',
        label: 'P7',
        method: String.raw`superposition, with one piece overlapping`,
        statement: String.raw`$y'' - 4y' + 3y = x + xe^{x}$`,
        solution: String.raw`$m^2 - 4m + 3 = (m - 1)(m - 3) = 0$, so $y_c = c_1e^{x} + c_2e^{3x}$.

The forcing is two unlike pieces, so solve for each separately: $g_1 = x$ and $g_2 = xe^x$.

**For $g_1 = x$.** Zero is not a root, so use $Cx + D$:

$$0 - 4C + 3(Cx + D) = 3Cx + (3D - 4C) = x \quad\Longrightarrow\quad C = \tfrac{1}{3},\ D = \tfrac{4}{9}$$

**For $g_2 = xe^x$.** The natural guess is $(Ax + B)e^x$, but $e^x$ is in $y_c$, so multiply by $x$:
$y_{p2} = x(Ax + B)e^x$. Write it as $ue^x$ with $u = Ax^2 + Bx$. Then
$y' = (u + u')e^x$ and $y'' = (u + 2u' + u'')e^x$, and

$$y'' - 4y' + 3y = (u'' - 2u')e^x$$

Set $u'' - 2u' = x$, which is $2A - 4Ax - 2B = x$. So $A = -\tfrac{1}{4}$, and $2A - 2B = 0$ gives
$B = -\tfrac{1}{4}$.

Add the pieces:

$$\boxed{y = c_1e^{x} + c_2e^{3x} + \frac{x}{3} + \frac{4}{9} - \frac{x^2 + x}{4}\,e^{x}}$$`,
      },
      {
        id: 'mth425-lab4-p8',
        label: 'P8',
        method: String.raw`initial value problem with complex roots`,
        statement: String.raw`$y'' + 4y' + 5y = 35e^{-4x}, \qquad y(0) = -3, \quad y'(0) = 1$`,
        solution: String.raw`$m^2 + 4m + 5 = 0$ gives $m = -2 \pm i$, so $y_c = e^{-2x}(c_1\cos x + c_2\sin x)$.

The forcing $e^{-4x}$ does not appear in $y_c$, so $y_p = Ae^{-4x}$:

$$(16A - 16A + 5A)e^{-4x} = 5Ae^{-4x} = 35e^{-4x} \quad\Longrightarrow\quad A = 7$$

General solution first, then the conditions:

$$y = e^{-2x}(c_1\cos x + c_2\sin x) + 7e^{-4x}$$

$y(0) = c_1 + 7 = -3$, so $c_1 = -10$. Differentiating,

$$y' = e^{-2x}\big[(-2c_1 + c_2)\cos x + (-2c_2 - c_1)\sin x\big] - 28e^{-4x}$$

$y'(0) = -2c_1 + c_2 - 28 = 20 + c_2 - 28 = 1$, so $c_2 = 9$.

$$\boxed{y = e^{-2x}(9\sin x - 10\cos x) + 7e^{-4x}, \qquad -\infty < x < \infty}$$

Applying $y(0) = -3$ to $y_c$ alone would give $c_1 = -3$, which is the classic wrong answer here.`,
      },
      {
        id: 'mth425-lab4-ba',
        label: 'B(a)',
        method: String.raw``,
        statement: String.raw`$y'' + 4y = x\sin 2x$`,
        solution: String.raw`Roots $\pm 2i$, so $y_c = c_1\cos 2x + c_2\sin 2x$. The base guess for $x\sin 2x$ is
$(Ax + B)\cos 2x + (Cx + D)\sin 2x$, which contains $B\cos 2x$ and $D\sin 2x$, both in $y_c$.
Multiply the whole thing by $x$:

$$y_p = x\big[(Ax + B)\cos 2x + (Cx + D)\sin 2x\big]$$`,
      },
      {
        id: 'mth425-lab4-bb',
        label: 'B(b)',
        method: String.raw``,
        statement: String.raw`$y''' - y'' = 4x + e^{x}$`,
        solution: String.raw`$m^2(m - 1) = 0$, so the roots are $0, 0, 1$ and $y_c = c_1 + c_2x + c_3e^x$. Piece by piece:

- $4x$: the base guess $Ax + B$ collides with $c_1 + c_2x$. Zero is a double root, so $s = 2$
  and you get $x^2(Ax + B)$.
- $e^x$: $1$ is a simple root, so $Cxe^x$.

$$y_p = x^2(Ax + B) + Cxe^x$$`,
      },
      {
        id: 'mth425-lab4-bc',
        label: 'B(c)',
        method: String.raw``,
        statement: String.raw`$y'' + y = \sec x$`,
        solution: String.raw`**The method does not apply.** $\sec x$ is not a polynomial, exponential, sine, cosine or a
product of them, and its derivatives never settle into a finite family to guess from. Use
variation of parameters (Set 5, §3.5).`,
      },
      {
        id: 'mth425-lab4-bd',
        label: 'B(d)',
        method: String.raw``,
        statement: String.raw`$y'' + 2y' + 5y = e^{-x}\sin 2x$`,
        solution: String.raw`Roots $-1 \pm 2i$, so $y_c = e^{-x}(c_1\cos 2x + c_2\sin 2x)$. The base guess
$e^{-x}(A\cos 2x + B\sin 2x)$ is exactly the form of $y_c$, so multiply by $x$:

$$y_p = xe^{-x}(A\cos 2x + B\sin 2x)$$`,
      },
      {
        id: 'mth425-lab4-be',
        label: 'B(e)',
        method: String.raw``,
        statement: String.raw`$x^2y'' + xy' - y = 3x$`,
        solution: String.raw`**The method does not apply as taught.** The coefficients are functions of $x$, not constants,
and the table of guesses assumes constant coefficients.`,
      },
    ],
  },
  {
    id: 'mth425-lab5',
    number: 5,
    title: 'Variation of parameters',
    ref: 'Zill §3.5',
    blurb: 'Quiz prep. Closed book, about 10 minutes per problem. Solve each equation, using variation of parameters unless the problem says otherwise. Problems 1 to 5 have forcing that undetermined coefficients cannot handle, problem 6 is variable-coefficient, problem 7 is an initial value problem, and problem 8 can be done both ways. Every solution was checked by substituting back.',
    intro: String.raw`**Standard form first.** Divide through so the equation reads $y'' + P(x)y' + Q(x)y = f(x)$. The
$f$ in every formula below is the right side of *this* form.

**Step 1.** Solve the homogeneous equation: $y_c = c_1y_1 + c_2y_2$. For constant coefficients,
$am^2 + bm + c = 0$ gives:

| Roots | $y_1,\ y_2$ |
|---|---|
| distinct real $m_1, m_2$ | $e^{m_1x},\ e^{m_2x}$ |
| repeated real $m$ | $e^{mx},\ xe^{mx}$ |
| complex $\alpha \pm \beta i$ | $e^{\alpha x}\cos\beta x,\ e^{\alpha x}\sin\beta x$ |

**Step 2.** Wronskian and its two companions:

$$W = \begin{vmatrix} y_1 & y_2 \\ y_1' & y_2' \end{vmatrix} = y_1y_2' - y_2y_1', \qquad
W_1 = \begin{vmatrix} 0 & y_2 \\ f & y_2' \end{vmatrix} = -y_2f, \qquad
W_2 = \begin{vmatrix} y_1 & 0 \\ y_1' & f \end{vmatrix} = y_1f$$

**Step 3.** $u_1' = \dfrac{W_1}{W}$ and $u_2' = \dfrac{W_2}{W}$. Integrate for $u_1$ and $u_2$ (the
constants of integration can be dropped).

**Step 4.** $y_p = u_1y_1 + u_2y_2$ and $y = y_c + y_p$. Apply initial conditions last, to the whole $y$.`,
    pdf: 'practice/mth425/set5.pdf',
    problems: [
      {
        id: 'mth425-lab5-p1',
        label: 'P1',
        method: String.raw`constant coefficients, forcing outside the table`,
        statement: String.raw`$y'' + y = \sec x$`,
        solution: String.raw`Second order, linear, constant coefficients. The forcing $\sec x$ is not a polynomial, exponential,
sine or cosine, and its derivatives never close into a finite family, so undetermined coefficients
fails. Use variation of parameters.

Already in standard form, with $f = \sec x$. $m^2 + 1 = 0$ gives $m = \pm i$, so
$y_1 = \cos x$, $y_2 = \sin x$, and

$$y_c = c_1\cos x + c_2\sin x$$

$$W = \cos x\cdot\cos x - (-\sin x)\sin x = 1$$

$$W_1 = -\sin x\sec x = -\tan x, \qquad W_2 = \cos x\sec x = 1$$

$$u_1' = -\tan x \ \Longrightarrow\ u_1 = \ln|\cos x|, \qquad u_2' = 1 \ \Longrightarrow\ u_2 = x$$

On the interval below $\cos x > 0$, so $u_1 = \ln(\cos x)$. Then

$$y_p = \cos x\,\ln(\cos x) + x\sin x$$

$$\boxed{y = c_1\cos x + c_2\sin x + \cos x\,\ln(\cos x) + x\sin x, \qquad -\tfrac{\pi}{2} < x < \tfrac{\pi}{2}}$$

The interval comes from $f = \sec x$, which blows up at $x = \pm\pi/2$. The same formula works on
any other interval between consecutive zeros of $\cos x$, with $\ln|\cos x|$ in place of $\ln(\cos x)$.`,
      },
      {
        id: 'mth425-lab5-p2',
        label: 'P2',
        method: String.raw`same homogeneous part, trickier integral`,
        statement: String.raw`$y'' + y = \tan x$`,
        solution: String.raw`Same left side as problem 1, so $y_c = c_1\cos x + c_2\sin x$ and $W = 1$. Here $f = \tan x$.

$$W_1 = -\sin x\tan x = -\frac{\sin^2 x}{\cos x} = \cos x - \sec x, \qquad W_2 = \cos x\tan x = \sin x$$

$$u_1' = \cos x - \sec x \ \Longrightarrow\ u_1 = \sin x - \ln|\sec x + \tan x|$$

$$u_2' = \sin x \ \Longrightarrow\ u_2 = -\cos x$$

The step $\sin^2 x/\cos x = \sec x - \cos x$ comes from writing $\sin^2 x = 1 - \cos^2 x$. Now assemble:

$$y_p = \cos x\big(\sin x - \ln|\sec x + \tan x|\big) - \cos x\sin x = -\cos x\,\ln|\sec x + \tan x|$$

The $\sin x\cos x$ terms cancel.

$$\boxed{y = c_1\cos x + c_2\sin x - \cos x\,\ln|\sec x + \tan x|, \qquad -\tfrac{\pi}{2} < x < \tfrac{\pi}{2}}$$

On this interval $\sec x + \tan x > 0$, so the absolute value can be dropped. The interval is the
same as in problem 1, because $\tan x$ also fails at $\pm\pi/2$.`,
      },
      {
        id: 'mth425-lab5-p3',
        label: 'P3',
        method: String.raw`frequency 3, so the Wronskian is not 1`,
        statement: String.raw`$y'' + 9y = \csc 3x$`,
        solution: String.raw`$m^2 + 9 = 0$ gives $m = \pm 3i$, so $y_1 = \cos 3x$, $y_2 = \sin 3x$, $f = \csc 3x$.

$$W = \cos 3x\cdot 3\cos 3x - (-3\sin 3x)\sin 3x = 3$$

$$W_1 = -\sin 3x\csc 3x = -1, \qquad W_2 = \cos 3x\csc 3x = \cot 3x$$

$$u_1' = -\frac{1}{3} \ \Longrightarrow\ u_1 = -\frac{x}{3}, \qquad
u_2' = \frac{\cot 3x}{3} \ \Longrightarrow\ u_2 = \frac{1}{9}\ln|\sin 3x|$$

The factor $\tfrac{1}{3}$ in $u_2$ comes from $\int\cot 3x\,dx = \tfrac{1}{3}\ln|\sin 3x|$, on top of
the $\tfrac{1}{3}$ from dividing by $W$.

$$y_p = -\frac{x}{3}\cos 3x + \frac{1}{9}\sin 3x\,\ln|\sin 3x|$$

$$\boxed{y = c_1\cos 3x + c_2\sin 3x - \frac{x}{3}\cos 3x + \frac{1}{9}\sin 3x\,\ln(\sin 3x), \qquad 0 < x < \tfrac{\pi}{3}}$$

$\csc 3x$ is undefined where $\sin 3x = 0$, that is at $x = 0, \pm\pi/3, \dots$. The interval
$0 < x < \pi/3$ has $\sin 3x > 0$, so the absolute value is gone.`,
      },
      {
        id: 'mth425-lab5-p4',
        label: 'P4',
        method: String.raw`repeated root, forcing $e^x/x$`,
        statement: String.raw`$y'' - 2y' + y = \dfrac{e^x}{x}$`,
        solution: String.raw`$m^2 - 2m + 1 = (m - 1)^2 = 0$, a repeated root. So $y_1 = e^x$, $y_2 = xe^x$, and
$f = e^x/x$ (the leading coefficient is already 1).

$$W = e^x(e^x + xe^x) - e^x\cdot xe^x = e^{2x}$$

$$W_1 = -xe^x\cdot\frac{e^x}{x} = -e^{2x}, \qquad W_2 = e^x\cdot\frac{e^x}{x} = \frac{e^{2x}}{x}$$

$$u_1' = -1 \ \Longrightarrow\ u_1 = -x, \qquad u_2' = \frac{1}{x} \ \Longrightarrow\ u_2 = \ln x$$

$$y_p = -xe^x + xe^x\ln x$$

The term $-xe^x$ is a multiple of $y_2$, so it can be absorbed into $c_2$. Keeping it is also
correct.

$$\boxed{y = c_1e^x + c_2xe^x + xe^x\ln x, \qquad x > 0}$$

$f = e^x/x$ is undefined at $x = 0$, and $\ln x$ needs $x > 0$. The $\ln x$ in the answer is also
why undetermined coefficients could never guess it: no entry in the table produces a logarithm.`,
      },
      {
        id: 'mth425-lab5-p5',
        label: 'P5',
        method: String.raw`leading coefficient is not 1`,
        statement: String.raw`$3y'' - 6y' + 6y = e^x\sec x$`,
        solution: String.raw`The leading coefficient is 3, so **divide first**. The standard form is

$$y'' - 2y' + 2y = \tfrac{1}{3}e^x\sec x, \qquad f = \tfrac{1}{3}e^x\sec x$$

$m^2 - 2m + 2 = 0$ gives $m = 1 \pm i$, so $y_1 = e^x\cos x$, $y_2 = e^x\sin x$.

$$W = e^x\cos x\,(e^x\sin x + e^x\cos x) - (e^x\cos x - e^x\sin x)\,e^x\sin x = e^{2x}$$

$$W_1 = -e^x\sin x\cdot\tfrac{1}{3}e^x\sec x = -\tfrac{1}{3}e^{2x}\tan x, \qquad
W_2 = e^x\cos x\cdot\tfrac{1}{3}e^x\sec x = \tfrac{1}{3}e^{2x}$$

$$u_1' = -\tfrac{1}{3}\tan x \ \Longrightarrow\ u_1 = \tfrac{1}{3}\ln(\cos x), \qquad
u_2' = \tfrac{1}{3} \ \Longrightarrow\ u_2 = \tfrac{x}{3}$$

$$y_p = \tfrac{1}{3}e^x\cos x\,\ln(\cos x) + \tfrac{1}{3}xe^x\sin x$$

$$\boxed{y = e^x(c_1\cos x + c_2\sin x) + \tfrac{1}{3}e^x\big[\cos x\,\ln(\cos x) + x\sin x\big], \qquad -\tfrac{\pi}{2} < x < \tfrac{\pi}{2}}$$

If you skip the division and use $f = e^x\sec x$, every $u$ comes out three times too large. That
is the standard mistake for this type of problem.`,
      },
      {
        id: 'mth425-lab5-p6',
        label: 'P6',
        method: String.raw`variable coefficients, standard form is the whole trick`,
        statement: String.raw`$x^2y'' + xy' - y = \ln x$, given that $y_1 = x$ and $y_2 = x^{-1}$ solve the homogeneous equation.`,
        solution: String.raw`Second order, linear, variable coefficients (Cauchy–Euler). Undetermined coefficients does not
apply. The two homogeneous solutions are supplied. Quick check: for $y = x$, $0 + x - x = 0$; for
$y = 1/x$, $x^2\cdot 2/x^3 - x/x^2 - 1/x = 0$. Both hold, so

$$y_c = c_1x + c_2x^{-1}$$

**Divide by $x^2$.** The standard form is $y'' + \tfrac{1}{x}y' - \tfrac{1}{x^2}y = \dfrac{\ln x}{x^2}$,
so $f = \dfrac{\ln x}{x^2}$, not $\ln x$.

$$W = x\Big(-\frac{1}{x^2}\Big) - \frac{1}{x}(1) = -\frac{2}{x}$$

$$W_1 = -\frac{1}{x}\cdot\frac{\ln x}{x^2} = -\frac{\ln x}{x^3}, \qquad W_2 = x\cdot\frac{\ln x}{x^2} = \frac{\ln x}{x}$$

$$u_1' = \frac{-\ln x/x^3}{-2/x} = \frac{\ln x}{2x^2}, \qquad u_2' = \frac{\ln x/x}{-2/x} = -\frac{\ln x}{2}$$

Integrate by parts, using $\int x^{-2}\ln x\,dx = -\dfrac{\ln x + 1}{x}$ and
$\int\ln x\,dx = x\ln x - x$:

$$u_1 = -\frac{\ln x + 1}{2x}, \qquad u_2 = -\frac{x\ln x - x}{2}$$

$$y_p = x\Big(-\frac{\ln x + 1}{2x}\Big) + \frac{1}{x}\Big(-\frac{x\ln x - x}{2}\Big)
= -\frac{\ln x + 1}{2} - \frac{\ln x - 1}{2} = -\ln x$$

$$\boxed{y = c_1x + c_2x^{-1} - \ln x, \qquad x > 0}$$

Check by hand: $y_p = -\ln x$ has $y_p' = -1/x$ and $y_p'' = 1/x^2$, so
$x^2y_p'' + xy_p' - y_p = 1 - 1 + \ln x = \ln x$.`,
      },
      {
        id: 'mth425-lab5-p7',
        label: 'P7',
        method: String.raw`initial value problem, repeated root`,
        statement: String.raw`$y'' + 2y' + y = e^{-x}\ln x, \qquad y(1) = 0, \quad y'(1) = e^{-1}$`,
        solution: String.raw`$m^2 + 2m + 1 = (m + 1)^2 = 0$, so $y_1 = e^{-x}$, $y_2 = xe^{-x}$, $f = e^{-x}\ln x$.
The $\ln x$ factor rules out undetermined coefficients, and the data at $x = 1$ puts the problem on
$x > 0$.

$$W = e^{-x}(e^{-x} - xe^{-x}) - (-e^{-x})(xe^{-x}) = e^{-2x}$$

$$W_1 = -xe^{-x}\cdot e^{-x}\ln x = -xe^{-2x}\ln x, \qquad W_2 = e^{-x}\cdot e^{-x}\ln x = e^{-2x}\ln x$$

$$u_1' = -x\ln x, \qquad u_2' = \ln x$$

$$u_1 = -\frac{x^2}{2}\ln x + \frac{x^2}{4}, \qquad u_2 = x\ln x - x$$

$$y_p = e^{-x}u_1 + xe^{-x}u_2 = e^{-x}\Big[-\frac{x^2}{2}\ln x + \frac{x^2}{4} + x^2\ln x - x^2\Big]
= e^{-x}\Big[\frac{x^2}{2}\ln x - \frac{3x^2}{4}\Big]$$

General solution first, then the conditions:

$$y = e^{-x}\Big[c_1 + c_2x + \frac{x^2}{2}\ln x - \frac{3x^2}{4}\Big]$$

$y(1) = e^{-1}\big[c_1 + c_2 - \tfrac{3}{4}\big] = 0$, so $c_1 + c_2 = \tfrac{3}{4}$. Differentiating,

$$y' = e^{-x}\Big[c_2 + x\ln x + \frac{x}{2} - \frac{3x}{2} - c_1 - c_2x - \frac{x^2}{2}\ln x + \frac{3x^2}{4}\Big]$$

At $x = 1$ the logarithm vanishes: $y'(1) = e^{-1}\big[c_2 - 1 - c_1 - c_2 + \tfrac{3}{4}\big]
= e^{-1}\big[-c_1 - \tfrac{1}{4}\big] = e^{-1}$, so $c_1 = -\tfrac{5}{4}$ and then $c_2 = 2$.

$$\boxed{y = e^{-x}\Big[-\frac{5}{4} + 2x - \frac{3x^2}{4} + \frac{x^2}{2}\ln x\Big], \qquad x > 0}$$`,
      },
      {
        id: 'mth425-lab5-p8',
        label: 'P8',
        method: String.raw`the same answer by two routes`,
        statement: String.raw`$y'' - y' - 2y = 6e^{2x}$. Solve it by variation of parameters, then again by undetermined
coefficients, and compare.`,
        solution: String.raw`Constant coefficients, and the forcing is an exponential, so *either* method works.
$m^2 - m - 2 = (m - 2)(m + 1) = 0$, so $y_1 = e^{2x}$, $y_2 = e^{-x}$ and

$$y_c = c_1e^{2x} + c_2e^{-x}$$

**Variation of parameters.** Here $f = 6e^{2x}$.

$$W = e^{2x}(-e^{-x}) - 2e^{2x}e^{-x} = -3e^{x}$$

$$W_1 = -e^{-x}\cdot 6e^{2x} = -6e^{x}, \qquad W_2 = e^{2x}\cdot 6e^{2x} = 6e^{4x}$$

$$u_1' = \frac{-6e^x}{-3e^x} = 2 \ \Longrightarrow\ u_1 = 2x, \qquad
u_2' = \frac{6e^{4x}}{-3e^x} = -2e^{3x} \ \Longrightarrow\ u_2 = -\frac{2}{3}e^{3x}$$

$$y_p = 2xe^{2x} - \frac{2}{3}e^{2x}$$

The second term is a multiple of $y_1$, so it goes into $c_1$.

**Undetermined coefficients.** $2$ is a simple root, so the guess $Ae^{2x}$ would vanish on the
left. Multiply by $x$: $y_p = Axe^{2x}$, with $y_p' = A(1 + 2x)e^{2x}$ and $y_p'' = A(4 + 4x)e^{2x}$.

$$Ae^{2x}\big[(4 + 4x) - (1 + 2x) - 2x\big] = 3Ae^{2x} = 6e^{2x} \ \Longrightarrow\ A = 2$$

Same $y_p = 2xe^{2x}$.

$$\boxed{y = c_1e^{2x} + c_2e^{-x} + 2xe^{2x}, \qquad -\infty < x < \infty}$$

Undetermined coefficients took three lines here and variation of parameters took ten, so when
$f$ is in the table use that method. Variation of parameters earns its keep when $f$ is not, but
it gives the right answer either way, and it is the better check when you are unsure of the
overlap rule.`,
      },
    ],
  },
  {
    id: 'mth425-lab6',
    number: 6,
    title: 'Laplace transforms',
    ref: 'Zill §4.2, 4.3',
    blurb: 'Quiz prep. Closed book, about 10 minutes per problem. Problem 1 is forward transforms, problems 2 to 4 are inverse transforms, problem 5 is unit step functions, and problems 6 to 8 are initial value problems solved with Laplace transforms (problem 8 has a step-function forcing). Convolution, $t\\,f(t)$, periodic functions, the Dirac delta and systems are left to Set 7. Every answer was checked independently. Pair names follow the course Laplace table.',
    intro: String.raw`**Transform pairs** (table rows, $\mathcal{L}\{f\} = F(s)$, $k$ and $a$ constants):

| Row in the table | $f(t)$ | $F(s)$ |
|---|---|---|
| $1$ | $1$ | $\dfrac{1}{s}$ |
| $t^n$ | $t^n$, $n = 0,1,2,\dots$ | $\dfrac{n!}{s^{n+1}}$ |
| $e^{at}$ | $e^{at}$ | $\dfrac{1}{s-a}$ |
| $\cos kt$ | $\cos kt$ | $\dfrac{s}{s^2+k^2}$ |
| $\sin kt$ | $\sin kt$ | $\dfrac{k}{s^2+k^2}$ |
| $e^{at}f(t)$ (first translation) | $e^{at}f(t)$ | $F(s-a)$ |
| $\dfrac{df}{dt}$ | $f'$ | $sF(s) - f(0)$ |
| $\dfrac{d^2f}{dt^2}$ | $f''$ | $s^2F(s) - sf(0) - f'(0)$ |
| $f(t-a)U(t-a)$ (second translation) | $f(t-a)U(t-a)$ | $e^{-as}F(s)$ |
| $g(t)U(t-a)$ | $g(t)U(t-a)$ | $e^{-as}\mathcal{L}\{g(t+a)\}$ |

All transforms are linear. Inverting: $\mathcal{L}^{-1}\{1/(s-a)^{n+1}\} = t^ne^{at}/n!$ (rows $t^n$ and
$e^{at}f(t)$ together), $\mathcal{L}^{-1}\{k/(s^2+k^2)\} = \sin kt$, so a numerator that is not $k$
needs a factor $1/k$. For $s^2 + bs + c$ with complex roots, complete the square to
$(s+p)^2 + q^2$, rewrite the numerator in terms of $s+p$, and read off $e^{-pt}\cos qt$ and
$e^{-pt}\sin qt$. For an IVP, transform both sides, solve for $Y(s)$, split into partial fractions,
invert.`,
    pdf: 'practice/mth425/set6.pdf',
    problems: [
      {
        id: 'mth425-lab6-p1',
        label: 'P1',
        method: String.raw`forward transforms`,
        statement: String.raw`Find $\mathcal{L}\{f\}$ for each.

(a) $f(t) = (t+2)^2 + 4\sin t\cos t - 5e^{-2t}$

(b) $f(t) = e^{-3t}\,(t^2 - 2t + 4) + e^{t}\,(2\sin 3t - \cos 3t)$

(c) $f(t) = \sin^2 t$, using the transform of a derivative, then confirm with a trig identity.`,
        solution: String.raw`**(a)** Expand and use a double-angle identity first, so that every piece is a table row:
$(t+2)^2 = t^2 + 4t + 4$ and $4\sin t\cos t = 2\sin 2t$. So
$f(t) = t^2 + 4t + 4 + 2\sin 2t - 5e^{-2t}$. Row by row:

- $t^n$ with $n = 2, 1, 0$: $\mathcal{L}\{t^2\} = 2/s^3$, $\mathcal{L}\{t\} = 1/s^2$, and $\mathcal{L}\{4\} = 4/s$ (row $1$).
- $\sin kt$ with $k = 2$: $\mathcal{L}\{2\sin 2t\} = 2\cdot 2/(s^2+4)$.
- $e^{at}$ with $a = -2$: $\mathcal{L}\{-5e^{-2t}\} = -5/(s+2)$.

$$\boxed{F(s) = \frac{2}{s^3} + \frac{4}{s^2} + \frac{4}{s} + \frac{4}{s^2+4} - \frac{5}{s+2}}$$

**(b)** Each term is $e^{at}\times$ (something in the table), so use the first translation theorem,
$\mathcal{L}\{e^{at}f(t)\} = F(s-a)$.

First group, $a = -3$ and $f(t) = t^2 - 2t + 4$, with $F(s) = \dfrac{2}{s^3} - \dfrac{2}{s^2} + \dfrac{4}{s}$
(rows $t^n$ and $1$). Replace $s$ by $s+3$:

$$\frac{2}{(s+3)^3} - \frac{2}{(s+3)^2} + \frac{4}{s+3}$$

Second group, $a = 1$ and $f(t) = 2\sin 3t - \cos 3t$, with
$F(s) = \dfrac{6}{s^2+9} - \dfrac{s}{s^2+9}$ (rows $\sin kt$, $\cos kt$, $k = 3$). Replace $s$ by $s-1$:

$$\frac{6 - (s-1)}{(s-1)^2 + 9} = \frac{7-s}{(s-1)^2+9}$$

$$\boxed{F(s) = \frac{2}{(s+3)^3} - \frac{2}{(s+3)^2} + \frac{4}{s+3} + \frac{7-s}{(s-1)^2+9}}$$

**(c)** $f(0) = \sin^2 0 = 0$ and $f'(t) = 2\sin t\cos t = \sin 2t$. Row $\dfrac{df}{dt}$ gives
$\mathcal{L}\{f'\} = sF(s) - f(0) = sF(s)$, and row $\sin kt$ ($k = 2$) gives $\mathcal{L}\{\sin 2t\} = 2/(s^2+4)$.
So $sF(s) = 2/(s^2+4)$.

$$\boxed{F(s) = \frac{2}{s\,(s^2+4)}}$$

Check with $\sin^2 t = \tfrac{1}{2}(1 - \cos 2t)$ (rows $1$ and $\cos kt$):
$\tfrac{1}{2}\Big(\dfrac{1}{s} - \dfrac{s}{s^2+4}\Big) = \dfrac{1}{2}\cdot\dfrac{(s^2+4) - s^2}{s(s^2+4)} = \dfrac{2}{s(s^2+4)}$. Same.`,
      },
      {
        id: 'mth425-lab6-p2',
        label: 'P2',
        method: String.raw`partial fractions, linear factor plus irreducible quadratic`,
        statement: String.raw`Find $\mathcal{L}^{-1}\left\{\dfrac{5s^2 - s + 4}{(s+1)(s^2+4)}\right\}$.`,
        solution: String.raw`$s^2 + 4$ has no real roots, so the decomposition needs a linear numerator over the quadratic:

$$\frac{5s^2 - s + 4}{(s+1)(s^2+4)} = \frac{A}{s+1} + \frac{Bs + C}{s^2+4}$$

Clear denominators: $5s^2 - s + 4 = A(s^2+4) + (Bs+C)(s+1)$.

- $s = -1$: $5 + 1 + 4 = 10 = 5A$, so $A = 2$.
- $s^2$ coefficients: $5 = A + B$, so $B = 3$.
- Constants: $4 = 4A + C$, so $C = -4$.

(Check the $s$ coefficients: $-1 = B + C = 3 - 4$. Good.)

$$\frac{2}{s+1} + \frac{3s}{s^2+4} - \frac{4}{s^2+4}$$

Invert with row $e^{at}$ ($a = -1$), row $\cos kt$ ($k = 2$), and row $\sin kt$ ($k = 2$). The last term
is $-4/(s^2+4) = -2\cdot\dfrac{2}{s^2+4}$, so it inverts to $-2\sin 2t$.

$$\boxed{f(t) = 2e^{-t} + 3\cos 2t - 2\sin 2t}$$`,
      },
      {
        id: 'mth425-lab6-p3',
        label: 'P3',
        method: String.raw`partial fractions with a repeated factor`,
        statement: String.raw`Find $\mathcal{L}^{-1}\left\{\dfrac{4s^2 - 15s + 4}{s\,(s-2)^2}\right\}$.`,
        solution: String.raw`A repeated factor $(s-2)^2$ needs a term for each power up to 2:

$$\frac{4s^2 - 15s + 4}{s(s-2)^2} = \frac{A}{s} + \frac{B}{s-2} + \frac{C}{(s-2)^2}$$

Clear denominators: $4s^2 - 15s + 4 = A(s-2)^2 + Bs(s-2) + Cs$.

- $s = 0$: $4 = 4A$, so $A = 1$.
- $s = 2$: $16 - 30 + 4 = -10 = 2C$, so $C = -5$.
- $s^2$ coefficients: $4 = A + B$, so $B = 3$.

$$\frac{1}{s} + \frac{3}{s-2} - \frac{5}{(s-2)^2}$$

Invert: row $1$ gives $1$, row $e^{at}$ with $a = 2$ gives $e^{2t}$, and
$\mathcal{L}^{-1}\{1/(s-2)^2\} = te^{2t}$ (row $t^n$ with $n = 1$, shifted by the first translation
theorem, $a = 2$).

$$\boxed{f(t) = 1 + 3e^{2t} - 5te^{2t}}$$`,
      },
      {
        id: 'mth425-lab6-p4',
        label: 'P4',
        method: String.raw`completing the square`,
        statement: String.raw`Find $\mathcal{L}^{-1}\left\{\dfrac{3s^2 + 15s + 22}{(s-1)(s^2+6s+13)}\right\}$.`,
        solution: String.raw`$s^2 + 6s + 13$ has discriminant $36 - 52 < 0$, so it stays together:

$$\frac{3s^2 + 15s + 22}{(s-1)(s^2+6s+13)} = \frac{A}{s-1} + \frac{Bs + C}{s^2+6s+13}$$

$3s^2 + 15s + 22 = A(s^2+6s+13) + (Bs+C)(s-1)$.

- $s = 1$: $3 + 15 + 22 = 40 = 20A$, so $A = 2$.
- $s^2$ coefficients: $3 = A + B$, so $B = 1$.
- Constants: $22 = 13A - C = 26 - C$, so $C = 4$.

Complete the square: $s^2 + 6s + 13 = (s+3)^2 + 4$, so $p = 3$ and $q = 2$. Rewrite the numerator in
terms of $s + 3$: $s + 4 = (s+3) + 1$.

$$\frac{2}{s-1} + \frac{(s+3) + 1}{(s+3)^2 + 2^2} = \frac{2}{s-1} + \frac{s+3}{(s+3)^2+2^2} + \frac{1}{2}\cdot\frac{2}{(s+3)^2+2^2}$$

Invert. Row $e^{at}$ ($a = 1$) gives $2e^t$. The other two are rows $\cos kt$ and $\sin kt$ with
$k = 2$, with $s$ replaced by $s+3$, so the first translation theorem ($a = -3$) multiplies each by
$e^{-3t}$.

$$\boxed{f(t) = 2e^{t} + e^{-3t}\cos 2t + \tfrac{1}{2}e^{-3t}\sin 2t}$$

The $\tfrac{1}{2}$ is the usual slip: $\sin 2t$ transforms to $2/(\cdot)$, not $1/(\cdot)$, so a lone
$1$ in the numerator has to be written as $\tfrac{1}{2}\cdot 2$.`,
      },
      {
        id: 'mth425-lab6-p5',
        label: 'P5',
        method: String.raw`the second translation theorem both ways`,
        statement: String.raw`(a) Find $\mathcal{L}\{t^2\,U(t-1)\}$.

(b) Let $f(t) = \sin t$ for $0 \le t < \pi$ and $f(t) = 0$ for $t \ge \pi$. Write $f$ with unit step
functions and find $\mathcal{L}\{f\}$.

(c) Find $\mathcal{L}^{-1}\left\{\dfrac{s\,e^{-\pi s/2}}{s^2+4}\right\}$.

(d) Find $\mathcal{L}^{-1}\left\{\dfrac{e^{-2s}}{s\,(s+3)}\right\}$.`,
        solution: String.raw`**(a)** Here the function multiplying $U(t-1)$ is $g(t) = t^2$, not a shifted function, so use row
$g(t)U(t-a)$ with $a = 1$: $e^{-s}\mathcal{L}\{g(t+1)\}$.
$g(t+1) = (t+1)^2 = t^2 + 2t + 1$, and with rows $t^n$ and $1$:

$$\boxed{\mathcal{L}\{t^2U(t-1)\} = e^{-s}\left(\frac{2}{s^3} + \frac{2}{s^2} + \frac{1}{s}\right)}$$

**(b)** The function switches off at $t = \pi$: $f(t) = \sin t - \sin t\,U(t-\pi)$. To use row
$f(t-a)U(t-a)$ the sine must be written in terms of $t - \pi$, and $\sin t = -\sin(t-\pi)$. So

$$f(t) = \sin t + \sin(t-\pi)\,U(t-\pi)$$

With rows $\sin kt$ ($k = 1$) and $f(t-a)U(t-a)$ ($a = \pi$):

$$\boxed{\mathcal{L}\{f\} = \frac{1}{s^2+1} + \frac{e^{-\pi s}}{s^2+1} = \frac{1 + e^{-\pi s}}{s^2+1}}$$

Check with row $g(t)U(t-a)$ instead: $g(t) = \sin t$, $g(t+\pi) = -\sin t$, so the second term is
$-\sin t\,U(t-\pi) \mapsto e^{-\pi s}\cdot\big(-\tfrac{1}{s^2+1}\big)$, and subtracting it gives
$+\dfrac{e^{-\pi s}}{s^2+1}$. Same.

**(c)** The factor $e^{-\pi s/2}$ says $a = \pi/2$. Without it, $F(s) = s/(s^2+4)$, which is row
$\cos kt$ with $k = 2$, so $f(t) = \cos 2t$. By row $f(t-a)U(t-a)$:

$$\mathcal{L}^{-1}\{e^{-\pi s/2}F(s)\} = \cos\big(2(t - \tfrac{\pi}{2})\big)\,U(t - \tfrac{\pi}{2})$$

Since $\cos(2t - \pi) = -\cos 2t$:

$$\boxed{f(t) = -\cos 2t\;U\!\left(t - \tfrac{\pi}{2}\right) = \begin{cases} 0, & 0 \le t < \pi/2 \\ -\cos 2t, & t \ge \pi/2 \end{cases}}$$

**(d)** Partial fractions on the part without the exponential:
$\dfrac{1}{s(s+3)} = \dfrac{1}{3}\Big(\dfrac{1}{s} - \dfrac{1}{s+3}\Big)$. Rows $1$ and $e^{at}$ ($a = -3$) give
$f_0(t) = \tfrac{1}{3}\big(1 - e^{-3t}\big)$. With $a = 2$, row $f(t-a)U(t-a)$ replaces $t$ by
$t - 2$ everywhere, including inside the exponential:

$$\boxed{f(t) = \tfrac{1}{3}\Big(1 - e^{-3(t-2)}\Big)\,U(t-2) = \begin{cases} 0, & 0 \le t < 2 \\ \tfrac{1}{3}\big(1 - e^{-3(t-2)}\big), & t \ge 2 \end{cases}}$$`,
      },
      {
        id: 'mth425-lab6-p6',
        label: 'P6',
        method: String.raw`initial value problem, complex roots`,
        statement: String.raw`Solve $y'' + 2y' + 5y = 8e^{-t}$, $\quad y(0) = 2$, $\quad y'(0) = -4$.`,
        solution: String.raw`Second order, linear, constant coefficients, with initial values given at $t = 0$, so Laplace
transforms fit. Let $Y(s) = \mathcal{L}\{y\}$. Rows $\dfrac{d^2f}{dt^2}$, $\dfrac{df}{dt}$ and $e^{at}$
($a = -1$):

$$\big[s^2Y - 2s + 4\big] + 2\big[sY - 2\big] + 5Y = \frac{8}{s+1}$$

$$(s^2 + 2s + 5)\,Y = 2s + \frac{8}{s+1}$$

The constants $+4$ and $-4$ cancelled. Combine and solve:

$$Y = \frac{2s(s+1) + 8}{(s+1)(s^2+2s+5)} = \frac{2s^2 + 2s + 8}{(s+1)(s^2+2s+5)} = \frac{A}{s+1} + \frac{Bs+C}{s^2+2s+5}$$

$2s^2 + 2s + 8 = A(s^2+2s+5) + (Bs+C)(s+1)$.

- $s = -1$: $2 - 2 + 8 = 8 = 4A$, so $A = 2$.
- $s^2$ coefficients: $2 = A + B$, so $B = 0$.
- Constants: $8 = 5A + C = 10 + C$, so $C = -2$.

$s^2 + 2s + 5 = (s+1)^2 + 2^2$, so

$$Y = \frac{2}{s+1} - \frac{2}{(s+1)^2+2^2}$$

The second term is already $k/(\cdot)$ with $k = 2$. Row $e^{at}$ gives $2e^{-t}$, and row $\sin kt$
with the first translation theorem ($a = -1$) gives $-e^{-t}\sin 2t$.

$$\boxed{y(t) = 2e^{-t} - e^{-t}\sin 2t = e^{-t}\,(2 - \sin 2t)}$$

Check the initial values: $y(0) = 2$. $y' = -2e^{-t} + e^{-t}\sin 2t - 2e^{-t}\cos 2t$, so
$y'(0) = -2 - 2 = -4$. Both match.`,
      },
      {
        id: 'mth425-lab6-p7',
        label: 'P7',
        method: String.raw`initial value problem with a repeated root, forcing needs the first translation theorem`,
        statement: String.raw`Solve $y'' - 6y' + 9y = t^2e^{3t}$, $\quad y(0) = 1$, $\quad y'(0) = 5$.`,
        solution: String.raw`Let $Y = \mathcal{L}\{y\}$. The forcing $t^2e^{3t}$ is $e^{at}f(t)$ with $a = 3$ and $f = t^2$, so its
transform is $2/(s-3)^3$ (rows $t^n$ and $e^{at}f(t)$). Transform the equation with rows
$\dfrac{d^2f}{dt^2}$ and $\dfrac{df}{dt}$:

$$\big[s^2Y - s - 5\big] - 6\big[sY - 1\big] + 9Y = \frac{2}{(s-3)^3}$$

$$(s-3)^2\,Y = s - 1 + \frac{2}{(s-3)^3}$$

since $s^2 - 6s + 9 = (s-3)^2$, and moving the constants across gives $s + 5 - 6 = s - 1$.

$$Y = \frac{s-1}{(s-3)^2} + \frac{2}{(s-3)^5}$$

Rewrite $s - 1 = (s-3) + 2$:

$$Y = \frac{1}{s-3} + \frac{2}{(s-3)^2} + \frac{2}{(s-3)^5}$$

Invert with $\mathcal{L}^{-1}\{1/(s-3)^{n+1}\} = t^ne^{3t}/n!$: $e^{3t}$, then $2te^{3t}$, then
$2\cdot t^4e^{3t}/4! = \tfrac{1}{12}t^4e^{3t}$.

$$\boxed{y(t) = e^{3t}\Big(1 + 2t + \tfrac{1}{12}t^4\Big)}$$

Check: $y(0) = 1$. $y' = 3e^{3t}\big(1 + 2t + \tfrac{t^4}{12}\big) + e^{3t}\big(2 + \tfrac{t^3}{3}\big)$, so
$y'(0) = 3 + 2 = 5$.`,
      },
      {
        id: 'mth425-lab6-p8',
        label: 'P8',
        method: String.raw`initial value problem with a pulse forcing`,
        statement: String.raw`Solve $y'' + 3y' + 2y = f(t)$, $\quad y(0) = 0$, $\quad y'(0) = 1$, where
$f(t) = 6$ for $1 \le t < 3$ and $f(t) = 0$ otherwise.`,
        solution: String.raw`**Forcing.** The pulse is on from $t = 1$ to $t = 3$: $f(t) = 6\,U(t-1) - 6\,U(t-3)$. Row
$f(t-a)U(t-a)$ with $f = 6$ (row $1$) gives

$$\mathcal{L}\{f\} = \frac{6\,(e^{-s} - e^{-3s})}{s}$$

**Transform the equation** (rows $\dfrac{d^2f}{dt^2}$ and $\dfrac{df}{dt}$), with $Y = \mathcal{L}\{y\}$:

$$\big[s^2Y - 0 - 1\big] + 3\big[sY - 0\big] + 2Y = \frac{6\,(e^{-s} - e^{-3s})}{s}$$

$$(s+1)(s+2)\,Y = 1 + \frac{6\,(e^{-s} - e^{-3s})}{s}$$

$$Y = \frac{1}{(s+1)(s+2)} + 6\,(e^{-s} - e^{-3s})\,\frac{1}{s(s+1)(s+2)}$$

**Partial fractions.** $\dfrac{1}{(s+1)(s+2)} = \dfrac{1}{s+1} - \dfrac{1}{s+2}$, and
$\dfrac{1}{s(s+1)(s+2)} = \dfrac{1}{2s} - \dfrac{1}{s+1} + \dfrac{1}{2(s+2)}$ (cover-up: the values
at $s = 0, -1, -2$ are $\tfrac{1}{2}$, $-1$, $\tfrac{1}{2}$). Multiplying the second by 6 and inverting
rows $1$ and $e^{at}$ term by term gives

$$h(t) = \mathcal{L}^{-1}\left\{\frac{6}{s(s+1)(s+2)}\right\} = 3 - 6e^{-t} + 3e^{-2t}$$

The first part inverts to $e^{-t} - e^{-2t}$. The exponentials $e^{-s}$ and $e^{-3s}$ shift $h$
(row $f(t-a)U(t-a)$, $a = 1$ and $a = 3$):

$$\boxed{y(t) = e^{-t} - e^{-2t} + h(t-1)\,U(t-1) - h(t-3)\,U(t-3), \qquad h(t) = 3 - 6e^{-t} + 3e^{-2t}}$$

Piecewise:

$$y(t) = \begin{cases}
e^{-t} - e^{-2t}, & 0 \le t < 1 \\[2pt]
e^{-t} - e^{-2t} + 3 - 6e^{-(t-1)} + 3e^{-2(t-1)}, & 1 \le t < 3 \\[2pt]
e^{-t} - e^{-2t} - 6e^{-(t-1)} + 6e^{-(t-3)} + 3e^{-2(t-1)} - 3e^{-2(t-3)}, & t \ge 3
\end{cases}$$

Sense check: for $0 \le t < 1$ there is no forcing, so $y$ is the free response with the given
$y(0) = 0$, $y'(0) = 1$, and indeed $y'(0) = -1 + 2 = 1$. After $t = 3$ the forcing is off again and
$y$ decays, as the last line does. Because $h(0) = 0$ and $h'(0) = 0$, the pieces join with $y$ and
$y'$ continuous at $t = 1$ and $t = 3$, which is what a bounded forcing should give for a
second-order equation.`,
      },
    ],
  },
  {
    id: 'mth425-lab7',
    number: 7,
    title: 'Laplace transforms, operational properties and systems',
    ref: 'Zill §4.2, 4.3, 4.6',
    blurb: 'Quiz prep. Closed book, about 10 minutes per problem. Set 6 covered the basic pairs, partial fractions, derivatives, the s-shift and the unit step; here those steps are only the machinery. The new ideas are the derivative of a transform, convolution, periodic functions, the delta function and a 2 by 2 system. Every solution was checked with sympy.',
    intro: String.raw`**From the course table**, with $F(s) = \mathcal{L}\{f(t)\}$:

| $f(t)$ | $\mathcal{L}\{f(t)\}$ | $f(t)$ | $\mathcal{L}\{f(t)\}$ |
|---|---|---|---|
| $1$ | $\dfrac{1}{s}$ | $\dfrac{df}{dt}$ | $sF(s) - f(0)$ |
| $t^n$ | $\dfrac{n!}{s^{n+1}}$ | $\dfrac{d^2f}{dt^2}$ | $s^2F(s) - sf(0) - f'(0)$ |
| $e^{at}$ | $\dfrac{1}{s-a}$ | $e^{at}f(t)$ | $F(s-a)$ |
| $\cos kt$ | $\dfrac{s}{s^2+k^2}$ | $f(t-a)U(t-a)$ | $e^{-as}F(s)$ |
| $\sin kt$ | $\dfrac{k}{s^2+k^2}$ | | |

**Not in the table, so know them.** With $G(s) = \mathcal{L}\{g(t)\}$:

| Property | Statement |
|---|---|
| derivative of a transform | $\mathcal{L}\{t^nf(t)\} = (-1)^n\dfrac{d^nF}{ds^n}$ |
| convolution | $(f*g)(t) = \displaystyle\int_0^t f(\tau)g(t-\tau)\,d\tau$, and $\mathcal{L}\{f*g\} = F(s)G(s)$ |
| integral | $\mathcal{L}\Big\{\displaystyle\int_0^t f(\tau)\,d\tau\Big\} = \dfrac{F(s)}{s}$ (this is $1*f$) |
| periodic, period $T$ | $\mathcal{L}\{f\} = \dfrac{1}{1-e^{-sT}}\displaystyle\int_0^T e^{-st}f(t)\,dt$ |
| Dirac delta, $a \ge 0$ | $\mathcal{L}\{\delta(t-a)\} = e^{-as}$ |

**System of two equations.** Transform both, solve the 2 by 2 algebraic system for $X(s)$ and $Y(s)$
(Cramer's rule), then invert each.`,
    pdf: 'practice/mth425/set7.pdf',
    problems: [
      {
        id: 'mth425-lab7-p1',
        label: 'P1',
        method: String.raw`derivative of the transform`,
        statement: String.raw`Find (a) $\mathcal{L}\{t\sin 3t\}$, (b) $\mathcal{L}\{t^2\cos t\}$, (c) $\mathcal{L}\{te^{-t}\sin 3t\}$,
and (d) $\mathcal{L}^{-1}\Big\{\dfrac{s}{(s^2+4)^2}\Big\}$.`,
        solution: String.raw`**(a)** Pair $\sin kt$ with $k = 3$: $F(s) = \dfrac{3}{s^2+9}$. Multiplying by $t$ means $-F'(s)$.

$$F'(s) = -\frac{6s}{(s^2+9)^2} \quad\Longrightarrow\quad \boxed{\mathcal{L}\{t\sin 3t\} = \frac{6s}{(s^2+9)^2}}$$

**(b)** Pair $\cos kt$ with $k = 1$: $F(s) = \dfrac{s}{s^2+1}$. Here $n = 2$, so the sign is $(-1)^2 = +1$ and
we differentiate twice.

$$F'(s) = \frac{(s^2+1) - s(2s)}{(s^2+1)^2} = \frac{1-s^2}{(s^2+1)^2}$$

$$F''(s) = \frac{-2s}{(s^2+1)^2} + (1-s^2)\cdot\frac{-2\cdot 2s}{(s^2+1)^3}
= \frac{-2s(s^2+1) - 4s(1-s^2)}{(s^2+1)^3} = \frac{2s^3 - 6s}{(s^2+1)^3}$$

$$\boxed{\mathcal{L}\{t^2\cos t\} = \frac{2s(s^2-3)}{(s^2+1)^3}}$$

**(c)** Two routes. Use the s-shift on the result of (a): $e^{-t}f(t)$ with $f = t\sin 3t$ gives
$F(s+1)$, so replace $s$ by $s+1$.

$$\mathcal{L}\{te^{-t}\sin 3t\} = \frac{6(s+1)}{\big((s+1)^2+9\big)^2}$$

Check by the other order: $\mathcal{L}\{e^{-t}\sin 3t\} = \dfrac{3}{(s+1)^2+9}$ (pair $e^{at}f(t)$), and
$-\dfrac{d}{ds}$ of that is $\dfrac{3\cdot 2(s+1)}{((s+1)^2+9)^2}$, the same.

$$\boxed{\mathcal{L}\{te^{-t}\sin 3t\} = \frac{6(s+1)}{\big((s+1)^2+9\big)^2}}$$

**(d)** Run the property backwards. Pair $\sin kt$ gives $\mathcal{L}\{\tfrac{1}{2}\sin 2t\} = \dfrac{1}{s^2+4}$, and
$-\dfrac{d}{ds}\dfrac{1}{s^2+4} = \dfrac{2s}{(s^2+4)^2}$. So
$\dfrac{2s}{(s^2+4)^2} = \mathcal{L}\{t\cdot\tfrac{1}{2}\sin 2t\}$, and dividing by 2:

$$\boxed{\mathcal{L}^{-1}\Big\{\frac{s}{(s^2+4)^2}\Big\} = \frac{1}{4}\,t\sin 2t}$$`,
      },
      {
        id: 'mth425-lab7-p2',
        label: 'P2',
        method: String.raw`convolution, forward and inverse`,
        statement: String.raw`(a) Write $\mathcal{L}\Big\{\displaystyle\int_0^t e^{-\tau}\cos(t-\tau)\,d\tau\Big\}$ as a function of $s$ without
doing the integral. Then use the convolution theorem to find (b) $\mathcal{L}^{-1}\Big\{\dfrac{1}{(s^2+1)^2}\Big\}$
and (c) $\mathcal{L}^{-1}\Big\{\dfrac{1}{(s+1)(s^2+4)}\Big\}$.`,
        solution: String.raw`**(a)** The integral is $e^{-t}*\cos t$. Pairs $e^{at}$ with $a = -1$ and $\cos kt$ with $k = 1$:

$$\boxed{\mathcal{L}\{e^{-t}*\cos t\} = \frac{1}{s+1}\cdot\frac{s}{s^2+1} = \frac{s}{(s+1)(s^2+1)}}$$

**(b)** Pair $\sin kt$ with $k = 1$: $\dfrac{1}{(s^2+1)^2} = \mathcal{L}\{\sin t\}\,\mathcal{L}\{\sin t\}$, so the
inverse is $\sin t * \sin t$. Use $\sin A\sin B = \tfrac{1}{2}[\cos(A-B) - \cos(A+B)]$ with
$A = \tau$, $B = t - \tau$:

$$\sin t * \sin t = \int_0^t \sin\tau\,\sin(t-\tau)\,d\tau = \frac{1}{2}\int_0^t\big[\cos(2\tau - t) - \cos t\big]\,d\tau$$

$$= \frac{1}{2}\Big[\tfrac{1}{2}\sin(2\tau - t) - \tau\cos t\Big]_0^t
= \frac{1}{2}\Big[\tfrac{1}{2}\sin t + \tfrac{1}{2}\sin t - t\cos t\Big]$$

$$\boxed{\mathcal{L}^{-1}\Big\{\frac{1}{(s^2+1)^2}\Big\} = \frac{1}{2}\big(\sin t - t\cos t\big)}$$

**(c)** Pairs $e^{at}$ with $a = -1$ and $\sin kt$ with $k = 2$: $\dfrac{1}{s^2+4} = \mathcal{L}\{\tfrac{1}{2}\sin 2t\}$. So

$$\mathcal{L}^{-1}\Big\{\frac{1}{(s+1)(s^2+4)}\Big\} = e^{-t} * \tfrac{1}{2}\sin 2t
= \frac{1}{2}\int_0^t e^{-(t-\tau)}\sin 2\tau\,d\tau = \frac{1}{2}e^{-t}\int_0^t e^{\tau}\sin 2\tau\,d\tau$$

Integrating by parts twice, $\displaystyle\int e^{\tau}\sin 2\tau\,d\tau = \frac{e^{\tau}(\sin 2\tau - 2\cos 2\tau)}{5}$.
Evaluating from 0 to $t$ gives $\dfrac{e^{t}(\sin 2t - 2\cos 2t) + 2}{5}$, so

$$\boxed{\mathcal{L}^{-1}\Big\{\frac{1}{(s+1)(s^2+4)}\Big\} = \frac{1}{10}\big(\sin 2t - 2\cos 2t + 2e^{-t}\big)}$$

Partial fractions give the same thing: the coefficient of $\dfrac{1}{s+1}$ is $\dfrac{1}{1+4} = \dfrac{1}{5}$,
matching $\dfrac{2}{10}e^{-t}$. Convolution is the only sensible route for (b), where partial fractions
over the reals fail because of the repeated factor $s^2+1$.`,
      },
      {
        id: 'mth425-lab7-p3',
        label: 'P3',
        method: String.raw`integral and integrodifferential equations`,
        statement: String.raw`Solve (a) the integral equation $y(t) = t + \displaystyle\int_0^t \sin(t-\tau)\,y(\tau)\,d\tau$, and
(b) the integrodifferential equation
$y'(t) + 2y(t) + \displaystyle\int_0^t y(\tau)\,d\tau = t, \quad y(0) = 0$.`,
        solution: String.raw`**(a)** The integral is a convolution, $\sin t * y$. Pair $\sin kt$ with $k = 1$, and $\mathcal{L}\{t\} = \dfrac{1}{s^2}$
from $t^n$. Transform both sides:

$$Y = \frac{1}{s^2} + \frac{1}{s^2+1}\,Y \quad\Longrightarrow\quad Y\,\frac{s^2}{s^2+1} = \frac{1}{s^2}
\quad\Longrightarrow\quad Y = \frac{s^2+1}{s^4} = \frac{1}{s^2} + \frac{1}{s^4}$$

Pair $t^n$ with $n = 1$ and $n = 3$ (note $\dfrac{1}{s^4} = \dfrac{1}{3!}\cdot\dfrac{3!}{s^4}$):

$$\boxed{y(t) = t + \frac{t^3}{6}}$$

**(b)** The integral of $y$ is $1 * y$, with transform $\dfrac{Y}{s}$. Pair $df/dt$ with $y(0) = 0$:

$$sY + 2Y + \frac{Y}{s} = \frac{1}{s^2} \quad\Longrightarrow\quad Y\,\frac{s^2 + 2s + 1}{s} = \frac{1}{s^2}
\quad\Longrightarrow\quad Y = \frac{1}{s(s+1)^2}$$

Partial fractions, $\dfrac{1}{s(s+1)^2} = \dfrac{A}{s} + \dfrac{B}{s+1} + \dfrac{C}{(s+1)^2}$: covering up gives
$A = 1$ and $C = -1$, and $A + B = 0$ (no $s^2$ term in the numerator) gives $B = -1$.

$$Y = \frac{1}{s} - \frac{1}{s+1} - \frac{1}{(s+1)^2}$$

Pairs: $1$, $e^{at}$ with $a = -1$, and $e^{at}f(t)$ with $f = t$ for the last term.

$$\boxed{y(t) = 1 - e^{-t} - te^{-t}}$$

Check: $y(0) = 1 - 1 - 0 = 0$. Also $y' = te^{-t}$ and $\int_0^t y\,d\tau = t - 2 + 2e^{-t} + te^{-t}$, so

$$y' + 2y + \int_0^t y\,d\tau = te^{-t} + (2 - 2e^{-t} - 2te^{-t}) + (t - 2 + 2e^{-t} + te^{-t}) = t$$`,
      },
      {
        id: 'mth425-lab7-p4',
        label: 'P4',
        method: String.raw`periodic functions`,
        statement: String.raw`Find the Laplace transform of each periodic function.

(a) The triangle wave with period 2: $f(t) = t$ for $0 \le t < 1$, $f(t) = 2 - t$ for $1 \le t < 2$,
and $f(t+2) = f(t)$.

(b) The half-wave rectified sine: $f(t) = \sin t$ for $0 \le t < \pi$, $f(t) = 0$ for $\pi \le t < 2\pi$,
and $f(t + 2\pi) = f(t)$.`,
        solution: String.raw`**(a)** $T = 2$. Antiderivatives:

$$\int te^{-st}\,dt = -\Big(\frac{t}{s} + \frac{1}{s^2}\Big)e^{-st}, \qquad
\int(2-t)e^{-st}\,dt = -\Big(\frac{2-t}{s} - \frac{1}{s^2}\Big)e^{-st}$$

$$\int_0^1 te^{-st}\,dt = \frac{1}{s^2} - \Big(\frac{1}{s} + \frac{1}{s^2}\Big)e^{-s}$$

$$\int_1^2 (2-t)e^{-st}\,dt = \frac{e^{-2s}}{s^2} + \Big(\frac{1}{s} - \frac{1}{s^2}\Big)e^{-s}$$

The $\dfrac{e^{-s}}{s}$ terms cancel in the sum:

$$\int_0^2 e^{-st}f\,dt = \frac{1 - 2e^{-s} + e^{-2s}}{s^2} = \frac{(1-e^{-s})^2}{s^2}$$

Divide by $1 - e^{-2s} = (1-e^{-s})(1+e^{-s})$:

$$\boxed{F(s) = \frac{1}{s^2}\cdot\frac{1 - e^{-s}}{1 + e^{-s}} = \frac{\tanh(s/2)}{s^2}}$$

**(b)** $T = 2\pi$, and $f = 0$ on the second half, so only $[0, \pi]$ contributes. The antiderivative is

$$\int e^{-st}\sin t\,dt = \frac{e^{-st}(-s\sin t - \cos t)}{s^2+1}$$

so

$$\int_0^{\pi} e^{-st}\sin t\,dt = \frac{e^{-s\pi}(0 + 1) - (0 - 1)}{s^2+1} = \frac{1 + e^{-\pi s}}{s^2+1}$$

$$F(s) = \frac{1 + e^{-\pi s}}{(s^2+1)(1 - e^{-2\pi s})}$$

Since $1 - e^{-2\pi s} = (1 - e^{-\pi s})(1 + e^{-\pi s})$, the factor $1 + e^{-\pi s}$ cancels:

$$\boxed{F(s) = \frac{1}{(s^2+1)(1 - e^{-\pi s})}}$$

Cancel the common factor before stopping. The unsimplified form is correct but the short one is
what a marker looks for.`,
      },
      {
        id: 'mth425-lab7-p5',
        label: 'P5',
        method: String.raw`impulse forcing`,
        statement: String.raw`Solve $y'' + 4y = \sin t + \delta(t - \pi)$, $\quad y(0) = 1$, $\quad y'(0) = 0$, and state the jump in
$y'$ at $t = \pi$.`,
        solution: String.raw`The delta is a unit impulse at $t = \pi$. Transform with pair $d^2f/dt^2$, pair $\sin kt$ with $k = 1$, and $\mathcal{L}\{\delta(t-\pi)\} = e^{-\pi s}$:

$$s^2Y - s\cdot 1 - 0 + 4Y = \frac{1}{s^2+1} + e^{-\pi s}
\quad\Longrightarrow\quad Y = \frac{s}{s^2+4} + \frac{1}{(s^2+1)(s^2+4)} + \frac{e^{-\pi s}}{s^2+4}$$

Partial fractions for the middle term: $\dfrac{1}{(s^2+1)(s^2+4)} = \dfrac{1}{3}\Big(\dfrac{1}{s^2+1} - \dfrac{1}{s^2+4}\Big)$.
Invert with pairs $\cos kt$ ($k = 2$) and $\sin kt$ ($k = 1$ and $k = 2$, using $\dfrac{1}{s^2+4} = \mathcal{L}\{\tfrac{1}{2}\sin 2t\}$).
For the last term use $f(t-a)U(t-a)$ with $a = \pi$ and $f = \tfrac{1}{2}\sin 2t$; since
$\sin 2(t - \pi) = \sin 2t$, the shifted term is $\tfrac{1}{2}\sin 2t\,U(t-\pi)$.

$$y(t) = \cos 2t + \frac{1}{3}\sin t - \frac{1}{6}\sin 2t + \frac{1}{2}\sin 2t\;U(t-\pi)$$

$$\boxed{y(t) = \begin{cases}
\cos 2t + \tfrac{1}{3}\sin t - \tfrac{1}{6}\sin 2t, & 0 \le t < \pi\\[4pt]
\cos 2t + \tfrac{1}{3}\sin t + \tfrac{1}{3}\sin 2t, & t \ge \pi
\end{cases}}$$

**Jump.** $y$ itself is continuous at $\pi$ (the added term is $\tfrac{1}{2}\sin 2t$, which is $0$ at
$t = \pi$). Its derivative gains $\tfrac{1}{2}\cdot 2\cos 2\pi = 1$, so $y'(\pi^+) - y'(\pi^-) = 1$.
That is the rule for $\delta(t-a)$ in $y'' + ky = \dots$: the velocity jumps by the strength of the
impulse and the position does not.`,
      },
      {
        id: 'mth425-lab7-p6',
        label: 'P6',
        method: String.raw`2 by 2 system`,
        statement: String.raw`Solve the system with the Laplace transform:

$$x' = 3x - 2y, \qquad y' = 2x - 2y + 1, \qquad x(0) = 1,\quad y(0) = 0$$`,
        solution: String.raw`Transform each equation with pair $df/dt$ and $\mathcal{L}\{1\} = \dfrac{1}{s}$:

$$sX - 1 = 3X - 2Y, \qquad sY - 0 = 2X - 2Y + \frac{1}{s}$$

Collect the unknowns on the left:

$$(s-3)X + 2Y = 1, \qquad -2X + (s+2)Y = \frac{1}{s}$$

The determinant is $\Delta = (s-3)(s+2) + 4 = s^2 - s - 2 = (s-2)(s+1)$. Cramer's rule:

$$X = \frac{1\cdot(s+2) - 2\cdot\frac{1}{s}}{\Delta} = \frac{s^2 + 2s - 2}{s(s-2)(s+1)}, \qquad
Y = \frac{(s-3)\cdot\frac{1}{s} - (-2)(1)}{\Delta} = \frac{3(s-1)}{s(s-2)(s+1)}$$

Partial fractions by covering up each factor. For $X$:

$$X = \frac{1}{s} + \frac{1}{s-2} - \frac{1}{s+1}$$

at $s = 0$: $\dfrac{-2}{(-2)(1)} = 1$; at $s = 2$: $\dfrac{6}{2\cdot 3} = 1$; at $s = -1$: $\dfrac{-3}{(-1)(-3)} = -1$.
For $Y$: at $s = 0$: $\dfrac{-3}{(-2)(1)} = \dfrac{3}{2}$; at $s = 2$: $\dfrac{3}{2\cdot 3} = \dfrac{1}{2}$;
at $s = -1$: $\dfrac{-6}{(-1)(-3)} = -2$.

$$Y = \frac{3/2}{s} + \frac{1/2}{s-2} - \frac{2}{s+1}$$

Invert with pairs $1$ and $e^{at}$:

$$\boxed{x(t) = 1 + e^{2t} - e^{-t}, \qquad y(t) = \frac{3}{2} + \frac{1}{2}e^{2t} - 2e^{-t}}$$

Check: $x(0) = 1$, $y(0) = 0$. Also $x' = 2e^{2t} + e^{-t}$, and $3x - 2y = 3 + 3e^{2t} - 3e^{-t} - 3 - e^{2t} + 4e^{-t} = 2e^{2t} + e^{-t}$.
The second equation is the same kind of check, with $y' = e^{2t} + 2e^{-t}$.`,
      },
      {
        id: 'mth425-lab7-p7',
        label: 'P7',
        method: String.raw`variable coefficients, transform ODE is first order`,
        statement: String.raw`Solve $ty'' - ty' + y = 2$, $\quad y(0) = 2$, $\quad y'(0) = -4$.`,
        solution: String.raw`The coefficients depend on $t$, so each $t\,(\cdot)$ term becomes $-\dfrac{d}{ds}$ of a transform.
With $\mathcal{L}\{y\} = Y$:

$$\mathcal{L}\{y''\} = s^2Y - 2s + 4, \qquad \mathcal{L}\{y'\} = sY - 2$$

$$\mathcal{L}\{ty''\} = -\frac{d}{ds}\big(s^2Y - 2s + 4\big) = -s^2Y' - 2sY + 2$$

$$\mathcal{L}\{-ty'\} = +\frac{d}{ds}\big(sY - 2\big) = Y + sY'$$

The constant $y'(0) = -4$ disappears under $\dfrac{d}{ds}$, so it does not enter this equation. Add
everything, with $\mathcal{L}\{y\} = Y$ and $\mathcal{L}\{2\} = \dfrac{2}{s}$:

$$(s - s^2)Y' + (2 - 2s)Y + 2 = \frac{2}{s} \quad\Longrightarrow\quad (1-s)\big(sY' + 2Y\big) = \frac{2(1-s)}{s}$$

Cancel $1 - s$ (valid for $s \ne 1$): $sY' + 2Y = \dfrac{2}{s}$. Multiply by $s$ to make the left side an
exact derivative:

$$s^2Y' + 2sY = (s^2Y)' = 2 \quad\Longrightarrow\quad s^2Y = 2s + C \quad\Longrightarrow\quad Y = \frac{2}{s} + \frac{C}{s^2}$$

Pairs $1$ and $t^n$ with $n = 1$: $y = 2 + Ct$. Now $y'(0) = C = -4$ fixes the constant, and
$y(0) = 2$ is already satisfied.

$$\boxed{y(t) = 2 - 4t}$$

Check: $y'' = 0$, $y' = -4$, so $ty'' - ty' + y = 0 + 4t + 2 - 4t = 2$.`,
      },
      {
        id: 'mth425-lab7-p8',
        label: 'P8',
        method: String.raw`the forcing needs the derivative rule, the inverse needs convolution`,
        statement: String.raw`Solve $y'' + 4y = t\sin 2t$, $\quad y(0) = 0$, $\quad y'(0) = 0$.`,
        solution: String.raw`The forcing is resonant (frequency 2 on a system with natural frequency 2). From problem 1 with $k = 2$,
$\mathcal{L}\{t\sin 2t\} = -\dfrac{d}{ds}\dfrac{2}{s^2+4} = \dfrac{4s}{(s^2+4)^2}$. With zero initial data:

$$(s^2 + 4)Y = \frac{4s}{(s^2+4)^2} \quad\Longrightarrow\quad Y = \frac{4s}{(s^2+4)^3} = -\frac{d}{ds}\left[\frac{1}{(s^2+4)^2}\right]$$

Let $G(s) = \dfrac{1}{(s^2+4)^2}$ with $g = \mathcal{L}^{-1}\{G\}$. Then $Y = -G'$, so
$y = t\,g(t)$. Find $g$ by convolution: $G = \Big(\dfrac{1}{s^2+4}\Big)^2 = \tfrac{1}{4}\,\mathcal{L}\{\sin 2t\}^2$ (pair $\sin kt$ with $k = 2$), so
$g = \tfrac{1}{4}\,\sin 2t * \sin 2t$.

$$\sin 2t * \sin 2t = \frac{1}{2}\int_0^t\big[\cos(4\tau - 2t) - \cos 2t\big]\,d\tau
= \frac{1}{2}\Big[\tfrac{1}{4}\sin(4\tau - 2t) - \tau\cos 2t\Big]_0^t
= \frac{1}{4}\sin 2t - \frac{t}{2}\cos 2t$$

so $g(t) = \dfrac{1}{16}\big(\sin 2t - 2t\cos 2t\big)$ and

$$\boxed{y(t) = t\,g(t) = \frac{t\sin 2t}{16} - \frac{t^2\cos 2t}{8}}$$

Check: $y(0) = 0$, and $y' = \dfrac{\sin 2t + 2t\cos 2t}{16} - \dfrac{2t\cos 2t - 2t^2\sin 2t}{8}$ is $0$ at $t = 0$.
The $t^2\cos 2t$ term is the resonance: the amplitude grows without bound.`,
      },
    ],
  },
  {
    id: 'mth425-lab8',
    number: 8,
    title: 'Vector functions, directional derivatives, tangent planes',
    ref: 'Zill §9.1, 9.5, 9.6',
    blurb: 'Quiz prep. Closed book, about 10 minutes per problem. Problems 1 and 2 are vector-valued functions of one variable (limits, derivatives, integrals, tangent vectors, arc length), problems 3 and 4 are gradients and directional derivatives, problems 5 and 6 are tangent planes and normal lines, and problems 7 and 8 use the same ideas to find special points and the angle between two surfaces. No figures are given, so describe the geometry in words as you go. Every answer was recomputed independently and compared with the written result.',
    intro: String.raw`**Vector functions.** For $\mathbf{r}(t) = \langle x(t),\,y(t),\,z(t)\rangle$, limits, derivatives and
integrals act on each component. The derivative $\mathbf{r}'(t)$ is tangent to the curve, and

$$\mathbf{T}(t) = \frac{\mathbf{r}'(t)}{\|\mathbf{r}'(t)\|}, \qquad
s = \int_a^b \|\mathbf{r}'(t)\|\,dt$$

**Gradient and directional derivative.** $\nabla f = \langle f_x, f_y, f_z\rangle$. For a **unit**
vector $\mathbf{u}$,

$$D_{\mathbf{u}}f = \nabla f\cdot\mathbf{u}$$

Normalize any given direction first. The largest rate of change at a point is $\|\nabla f\|$, in the
direction of $\nabla f$. The smallest is $-\|\nabla f\|$, in the direction of $-\nabla f$. The rate is zero
along directions perpendicular to $\nabla f$.

**Level surface $F(x,y,z) = c$.** $\nabla F$ at a point is normal to the surface there. Tangent plane
at $(x_0,y_0,z_0)$ and normal line:

$$F_x(x-x_0) + F_y(y-y_0) + F_z(z-z_0) = 0, \qquad
x = x_0 + F_x t,\quad y = y_0 + F_y t,\quad z = z_0 + F_z t$$

All three partials are evaluated at the point. For $z = f(x,y)$ use $F = f(x,y) - z$, so the normal is
$\langle f_x, f_y, -1\rangle$. The angle between two surfaces is the angle between their normals.`,
    pdf: 'practice/mth425/set8.pdf',
    problems: [
      {
        id: 'mth425-lab8-p1',
        label: 'P1',
        method: String.raw`calculus on each component`,
        statement: String.raw`(a) Evaluate $\displaystyle\lim_{t\to 0}\Big\langle \frac{\sin 3t}{t},\ \frac{1-\cos t}{t^2},\ \frac{e^{2t}-1}{t}\Big\rangle$.

(b) For $\mathbf{r}(t) = \langle te^{t},\ \sin 2t,\ \dfrac{1}{1+t^2}\rangle$, find $\mathbf{r}'(t)$ and $\mathbf{r}''(0)$.

(c) Evaluate $\displaystyle\int_0^1\Big(te^{t}\,\mathbf{i} + \frac{2t}{1+t^2}\,\mathbf{j} + 3t^2e^{t^3}\,\mathbf{k}\Big)\,dt$.`,
        solution: String.raw`**(a)** Take the limit of each component separately. Each is a standard limit of the form $0/0$.

$$\lim_{t\to 0}\frac{\sin 3t}{t} = 3\lim_{t\to 0}\frac{\sin 3t}{3t} = 3, \qquad
\lim_{t\to 0}\frac{1-\cos t}{t^2} = \frac{1}{2}, \qquad
\lim_{t\to 0}\frac{e^{2t}-1}{t} = 2$$

The middle one follows from $1 - \cos t = 2\sin^2(t/2)$, or from L'Hôpital applied twice. The last is
the derivative of $e^{2t}$ at $t = 0$.

$$\boxed{\langle 3,\ \tfrac{1}{2},\ 2\rangle}$$

**(b)** Differentiate each component. The third needs the chain rule:
$\dfrac{d}{dt}(1+t^2)^{-1} = -2t(1+t^2)^{-2}$.

$$\mathbf{r}'(t) = \Big\langle (1+t)e^{t},\ 2\cos 2t,\ -\frac{2t}{(1+t^2)^2}\Big\rangle$$

Differentiate again, using the product rule on the third component:

$$\mathbf{r}''(t) = \Big\langle (2+t)e^{t},\ -4\sin 2t,\ -\frac{2}{(1+t^2)^2} + \frac{8t^2}{(1+t^2)^3}\Big\rangle$$

At $t = 0$: $(2)(1) = 2$, $-4\sin 0 = 0$, and $-2 + 0 = -2$.

$$\boxed{\mathbf{r}'(t) = \Big\langle (1+t)e^{t},\ 2\cos 2t,\ -\frac{2t}{(1+t^2)^2}\Big\rangle, \qquad
\mathbf{r}''(0) = \langle 2,\ 0,\ -2\rangle}$$

**(c)** Integrate each component from $0$ to $1$.

$\mathbf{i}$: by parts, $\int te^{t}\,dt = (t-1)e^{t}$, so the value is $0 - (-1) = 1$.

$\mathbf{j}$: $\int \dfrac{2t}{1+t^2}\,dt = \ln(1+t^2)$, so the value is $\ln 2$.

$\mathbf{k}$: $\int 3t^2e^{t^3}\,dt = e^{t^3}$, so the value is $e - 1$.

$$\boxed{\mathbf{i} + (\ln 2)\,\mathbf{j} + (e-1)\,\mathbf{k}}$$`,
      },
      {
        id: 'mth425-lab8-p2',
        label: 'P2',
        method: String.raw`tangent vector, unit tangent, arc length`,
        statement: String.raw`(a) For $\mathbf{r}(t) = \langle e^{t}\cos t,\ e^{t}\sin t,\ e^{t}\rangle$, find the tangent vector, the unit tangent
vector and the tangent line at $t = 0$, and the arc length from $t = 0$ to $t = \ln 3$.

(b) For $\mathbf{r}(t) = \langle 2t,\ t^2,\ \ln t\rangle$, find the arc length from $t = 1$ to $t = e$ and the unit
tangent vector at $t = 1$.`,
        solution: String.raw`**(a)** The curve is a spiral that climbs a cone about the $z$-axis, since $x^2 + y^2 = z^2$ for
every $t$. By the product rule,

$$\mathbf{r}'(t) = e^{t}\langle \cos t - \sin t,\ \sin t + \cos t,\ 1\rangle$$

At $t = 0$ the point is $\mathbf{r}(0) = (1, 0, 1)$ and the tangent vector is
$\mathbf{r}'(0) = \langle 1, 1, 1\rangle$, with length $\sqrt{3}$. The unit tangent is

$$\mathbf{T}(0) = \frac{1}{\sqrt{3}}\langle 1,\ 1,\ 1\rangle$$

The tangent line through $(1,0,1)$ with direction $\langle 1,1,1\rangle$ is
$x = 1 + s,\ y = s,\ z = 1 + s$.

For arc length we need $\|\mathbf{r}'(t)\|$ for all $t$. The cross terms cancel:
$(\cos t - \sin t)^2 + (\sin t + \cos t)^2 = 2$, so

$$\|\mathbf{r}'(t)\| = e^{t}\sqrt{2 + 1} = \sqrt{3}\,e^{t}$$

$$s = \int_0^{\ln 3}\sqrt{3}\,e^{t}\,dt = \sqrt{3}\,(3 - 1) = 2\sqrt{3}$$

$$\boxed{\mathbf{T}(0) = \tfrac{1}{\sqrt{3}}\langle 1,1,1\rangle, \qquad \text{tangent line } (x,y,z) = (1+s,\ s,\ 1+s), \qquad s = 2\sqrt{3}}$$

**(b)** $\mathbf{r}'(t) = \langle 2,\ 2t,\ 1/t\rangle$, so

$$\|\mathbf{r}'(t)\|^2 = 4 + 4t^2 + \frac{1}{t^2} = \Big(2t + \frac{1}{t}\Big)^2$$

The expression under the root is a perfect square, which is the reason for the choice of curve. For
$t > 0$ the root is $2t + 1/t$:

$$s = \int_1^{e}\Big(2t + \frac{1}{t}\Big)dt = \Big[t^2 + \ln t\Big]_1^{e} = (e^2 + 1) - (1 + 0) = e^2$$

At $t = 1$: $\mathbf{r}'(1) = \langle 2, 2, 1\rangle$, with length $2t + 1/t = 3$.

$$\boxed{s = e^2, \qquad \mathbf{T}(1) = \tfrac{1}{3}\langle 2,\ 2,\ 1\rangle}$$`,
      },
      {
        id: 'mth425-lab8-p3',
        label: 'P3',
        method: String.raw`gradient, unit vector, dot product`,
        statement: String.raw`Let $f(x,y,z) = x^2y - yz^2 + xz$. Find the directional derivative of $f$ at $P(1,-2,3)$ in the direction
of the point $Q(3,0,2)$. Then give the largest rate of change of $f$ at $P$ and the unit vector in
which it occurs.`,
        solution: String.raw`Partial derivatives:

$$f_x = 2xy + z, \qquad f_y = x^2 - z^2, \qquad f_z = -2yz + x$$

At $P(1,-2,3)$: $f_x = -4 + 3 = -1$, $f_y = 1 - 9 = -8$, $f_z = 12 + 1 = 13$, so

$$\nabla f(P) = \langle -1,\ -8,\ 13\rangle$$

The direction from $P$ toward $Q$ is $\overrightarrow{PQ} = \langle 2, 2, -1\rangle$. It has length
$\sqrt{4 + 4 + 1} = 3$, so the **unit** vector is $\mathbf{u} = \tfrac{1}{3}\langle 2, 2, -1\rangle$. Using the
unnormalized vector would give a result three times too large.

$$D_{\mathbf{u}}f(P) = \nabla f\cdot\mathbf{u} = \frac{(-1)(2) + (-8)(2) + (13)(-1)}{3} = -\frac{31}{3}$$

Negative, so $f$ decreases as you move from $P$ toward $Q$.

The largest rate of change is $\|\nabla f(P)\| = \sqrt{1 + 64 + 169} = \sqrt{234} = 3\sqrt{26}$, in the
direction

$$\mathbf{u}_{\max} = \frac{\langle -1,\ -8,\ 13\rangle}{3\sqrt{26}}$$

$$\boxed{D_{\mathbf{u}}f(P) = -\tfrac{31}{3}\ \text{with}\ \mathbf{u} = \tfrac{1}{3}\langle 2,2,-1\rangle; \qquad
\max = 3\sqrt{26}\ \text{along}\ \tfrac{1}{3\sqrt{26}}\langle -1,-8,13\rangle}$$

As a sanity check, $-31/3 \approx -10.33$ has magnitude below $3\sqrt{26} \approx 15.30$, as it must.`,
      },
      {
        id: 'mth425-lab8-p4',
        label: 'P4',
        method: String.raw`normalize, then use the gradient`,
        statement: String.raw`Let $f(x,y) = \ln(x^2 + y^2)$ and $P = (1, 2)$.

(a) Find the rate of change of $f$ at $P$ in the direction of $\mathbf{a} = 3\mathbf{i} - 4\mathbf{j}$.

(b) In which direction does $f$ increase most rapidly at $P$, and what is that rate?

(c) In which directions is the rate of change zero at $P$?`,
        solution: String.raw`$$f_x = \frac{2x}{x^2 + y^2}, \qquad f_y = \frac{2y}{x^2 + y^2}, \qquad
\nabla f(1,2) = \Big\langle \frac{2}{5},\ \frac{4}{5}\Big\rangle$$

**(a)** $\mathbf{a} = \langle 3, -4\rangle$ is not a unit vector: $\|\mathbf{a}\| = 5$. So
$\mathbf{u} = \langle \tfrac{3}{5}, -\tfrac{4}{5}\rangle$ and

$$D_{\mathbf{u}}f(1,2) = \frac{2}{5}\cdot\frac{3}{5} + \frac{4}{5}\cdot\Big(-\frac{4}{5}\Big)
= \frac{6 - 16}{25} = -\frac{2}{5}$$

**(b)** The maximum rate is $\|\nabla f\| = \dfrac{1}{5}\sqrt{4 + 16} = \dfrac{2\sqrt{5}}{5} = \dfrac{2}{\sqrt 5}$, in
the direction

$$\mathbf{u}_{\max} = \frac{\langle 2/5,\ 4/5\rangle}{2/\sqrt5} = \frac{1}{\sqrt{5}}\langle 1,\ 2\rangle$$

This points straight away from the origin. That is expected: $f$ depends only on the distance from the
origin, and grows with it.

**(c)** The rate is zero when $\mathbf{u}\perp\nabla f$, that is when $\mathbf{u}\cdot\langle 1, 2\rangle = 0$.
The two unit vectors are

$$\mathbf{u} = \pm\frac{1}{\sqrt{5}}\langle 2,\ -1\rangle$$

These are tangent to the level curve $x^2 + y^2 = 5$ through $P$, which is a circle about the origin.

$$\boxed{\text{(a)}\ -\tfrac{2}{5}; \qquad \text{(b)}\ \tfrac{2}{\sqrt5}\ \text{along}\ \tfrac{1}{\sqrt5}\langle 1,2\rangle; \qquad
\text{(c)}\ \pm\tfrac{1}{\sqrt5}\langle 2,-1\rangle}$$`,
      },
      {
        id: 'mth425-lab8-p5',
        label: 'P5',
        method: String.raw`level surface, gradient is the normal`,
        statement: String.raw`Find the equation of the tangent plane and the parametric equations of the normal line to the surface
$x^2 + 2y^2 + 3z^2 = 21$ at $(1, 2, 2)$. Then find where the normal line crosses the $xy$-plane.`,
        solution: String.raw`First confirm the point is on the surface: $1 + 8 + 12 = 21$. Good. Take $F = x^2 + 2y^2 + 3z^2$, so
$c = 21$ and

$$\nabla F = \langle 2x,\ 4y,\ 6z\rangle, \qquad \nabla F(1,2,2) = \langle 2,\ 8,\ 12\rangle = 2\langle 1, 4, 6\rangle$$

A multiple of the normal is just as good as the normal. Using $\langle 1, 4, 6\rangle$:

$$1\,(x - 1) + 4\,(y - 2) + 6\,(z - 2) = 0 \ \Longrightarrow\ x + 4y + 6z = 21$$

The plane is $x + 4y + 6z = 21$. The normal line passes through $(1,2,2)$ with direction $\langle 1,4,6\rangle$:

$$x = 1 + t, \qquad y = 2 + 4t, \qquad z = 2 + 6t$$

It meets the $xy$-plane where $z = 0$: $2 + 6t = 0$, so $t = -\tfrac{1}{3}$. Then
$x = \tfrac{2}{3}$ and $y = 2 - \tfrac{4}{3} = \tfrac{2}{3}$.

$$\boxed{x + 4y + 6z = 21; \qquad (x,y,z) = (1 + t,\ 2 + 4t,\ 2 + 6t); \qquad \text{crosses at } (\tfrac{2}{3},\tfrac{2}{3},0)}$$`,
      },
      {
        id: 'mth425-lab8-p6',
        label: 'P6',
        method: String.raw`a graph is a level surface of $f(x,y) - z$`,
        statement: String.raw`Find the tangent plane and the normal line to the graph of $z = x^2e^{y}$ at the point where
$x = 1$ and $y = \ln 3$.`,
        solution: String.raw`At $(1, \ln 3)$: $z = 1\cdot e^{\ln 3} = 3$, so the point is $(1,\ \ln 3,\ 3)$. Write the graph as
$F(x,y,z) = x^2e^{y} - z = 0$. Then

$$\nabla F = \langle 2xe^{y},\ x^2e^{y},\ -1\rangle, \qquad \nabla F(1,\ln 3,\ 3) = \langle 6,\ 3,\ -1\rangle$$

Tangent plane:

$$6(x - 1) + 3(y - \ln 3) - (z - 3) = 0 \ \Longrightarrow\ 6x + 3y - z = 3 + 3\ln 3$$

Equivalently $z = 3 + 6(x-1) + 3(y - \ln 3)$, the usual form $z - z_0 = f_x(x - x_0) + f_y(y - y_0)$.
Normal line:

$$x = 1 + 6t, \qquad y = \ln 3 + 3t, \qquad z = 3 - t$$

$$\boxed{6x + 3y - z = 3 + 3\ln 3; \qquad (x,y,z) = (1 + 6t,\ \ln 3 + 3t,\ 3 - t)}$$`,
      },
      {
        id: 'mth425-lab8-p7',
        label: 'P7',
        method: String.raw`the normal must have the required direction`,
        statement: String.raw`(a) At what point of the surface $z = x^2 - 2x + y^2 + 4y$ is the tangent plane horizontal? Give the plane.

(b) At what points of the ellipsoid $x^2 + 2y^2 + z^2 = 16$ is the tangent plane parallel to the plane
$x + 2y + z = 5$? Give the tangent planes.`,
        solution: String.raw`**(a)** A horizontal plane has a vertical normal, so $\langle f_x, f_y, -1\rangle$ must be vertical,
meaning $f_x = f_y = 0$.

$$f_x = 2x - 2 = 0 \Rightarrow x = 1, \qquad f_y = 2y + 4 = 0 \Rightarrow y = -2$$

Then $z = 1 - 2 + 4 - 8 = -5$. The point is $(1, -2, -5)$ and the plane is $z = -5$. (Completing the
square gives $z = (x-1)^2 + (y+2)^2 - 5$, a bowl opening upward with its lowest point there.)

**(b)** With $F = x^2 + 2y^2 + z^2$, the normal is $\nabla F = \langle 2x, 4y, 2z\rangle$. It must be a
multiple of the normal $\langle 1, 2, 1\rangle$ of the given plane:

$$2x = \lambda,\quad 4y = 2\lambda,\quad 2z = \lambda \ \Longrightarrow\ x = y = z = \frac{\lambda}{2} \equiv s$$

Put this on the ellipsoid: $s^2 + 2s^2 + s^2 = 4s^2 = 16$, so $s = \pm 2$. The points are $(2,2,2)$ and
$(-2,-2,-2)$.

At $(2,2,2)$ the normal is $\langle 4, 8, 4\rangle \parallel \langle 1,2,1\rangle$, so
$(x-2) + 2(y-2) + (z-2) = 0$, which is $x + 2y + z = 8$.

At $(-2,-2,-2)$ the same normal direction gives $(x+2) + 2(y+2) + (z+2) = 0$, which is $x + 2y + z = -8$.

$$\boxed{\text{(a)}\ (1,-2,-5),\ z = -5; \qquad \text{(b)}\ (2,2,2)\ \text{with}\ x + 2y + z = 8,\ \ (-2,-2,-2)\ \text{with}\ x + 2y + z = -8}$$

The two planes sit on opposite sides of the ellipsoid, equally far from the origin, as the symmetry
of the surface requires.`,
      },
      {
        id: 'mth425-lab8-p8',
        label: 'P8',
        method: String.raw`angle between the normals`,
        statement: String.raw`The sphere $x^2 + y^2 + z^2 = 6$ and the paraboloid $z = x^2 + y^2$ intersect in a circle. Find the
angle between the two surfaces at the point $(1, 1, 2)$ of that circle.`,
        solution: String.raw`First check the point lies on both. Sphere: $1 + 1 + 4 = 6$. Paraboloid: $z = 2 = 1 + 1$. Both hold.
(Substituting $x^2 + y^2 = z$ into the sphere gives $z + z^2 = 6$, so $z = 2$ since $z = x^2 + y^2 \geq 0$
rules out $z = -3$. The intersection is the circle $x^2 + y^2 = 2$ at height $z = 2$.)

Normals:

$$F = x^2 + y^2 + z^2:\quad \nabla F = \langle 2x, 2y, 2z\rangle, \qquad \nabla F(1,1,2) = \langle 2, 2, 4\rangle$$

$$G = x^2 + y^2 - z:\quad \nabla G = \langle 2x, 2y, -1\rangle, \qquad \nabla G(1,1,2) = \langle 2, 2, -1\rangle$$

$$\nabla F\cdot\nabla G = 4 + 4 - 4 = 4, \qquad \|\nabla F\| = \sqrt{24} = 2\sqrt{6}, \qquad \|\nabla G\| = 3$$

$$\cos\theta = \frac{4}{2\sqrt6\cdot 3} = \frac{2}{3\sqrt{6}} = \frac{\sqrt{6}}{9}$$

$$\boxed{\theta = \arccos\!\Big(\frac{\sqrt{6}}{9}\Big) \approx 74.2^\circ}$$

The cosine is positive, so $\theta$ is the acute angle between the surfaces. By the rotational symmetry
about the $z$-axis, every point of the circle gives the same angle. Had the dot product come out
negative, the angle between the surfaces would still be quoted as the acute one, $\arccos|\cos\theta|$.`,
      },
    ],
  },
  {
    id: 'mth425-lab9',
    number: 9,
    title: 'Curl, divergence and line integrals',
    ref: 'Zill §9.7, 9.8, 9.9',
    blurb: 'Quiz prep. Closed book, about 10 minutes per problem. Problems 1 and 2 are about div, curl and the conservative tests. Problems 3 to 5 are line integrals computed by parameterizing, for a scalar function, for work, and in the form $P\\,dx + Q\\,dy + R\\,dz$. Problems 6 and 7 find a potential and use it, including a closed curve. Problem 8 is a field that is not conservative, so the only way through is to parameterize. No figures: every curve is described in words, with its parameterization and orientation stated. Every answer was recomputed independently by direct parameterization and, where a potential exists, through the potential.',
    intro: String.raw`**Divergence and curl.** For $\mathbf F = \langle P, Q, R\rangle$:

$$\operatorname{div}\mathbf F = P_x + Q_y + R_z, \qquad
\operatorname{curl}\mathbf F = \begin{vmatrix} \mathbf i & \mathbf j & \mathbf k \\
\partial_x & \partial_y & \partial_z \\ P & Q & R \end{vmatrix}
= \langle R_y - Q_z,\; P_z - R_x,\; Q_x - P_y\rangle$$

**Line integrals.** With $C$ given by $\mathbf r(t)$, $a \le t \le b$, and $ds = |\mathbf r'(t)|\,dt$:

$$\int_C f\,ds = \int_a^b f(\mathbf r(t))\,|\mathbf r'(t)|\,dt, \qquad
\int_C \mathbf F\cdot d\mathbf r = \int_a^b \mathbf F(\mathbf r(t))\cdot\mathbf r'(t)\,dt
= \int_C P\,dx + Q\,dy + R\,dz$$

The $ds$ integral does not care about direction. The work integral changes sign when the
orientation is reversed.

**Conservative test.** In 3D, $\operatorname{curl}\mathbf F = \mathbf 0$. In 2D, $M_y = N_x$ for
$\mathbf F = \langle M, N\rangle$. Either test settles it only on an open, simply connected domain
(no holes where the field fails to exist).

**Potential.** Solve $\varphi_x = P$ by integrating in $x$ (add an unknown function of the other
variables), then match $\varphi_y = Q$ and $\varphi_z = R$ to pin that function down.

**Fundamental theorem for line integrals.** If $\mathbf F = \nabla\varphi$, then
$\displaystyle\int_C \mathbf F\cdot d\mathbf r = \varphi(B) - \varphi(A)$, with $A$ the start and $B$
the end of $C$. The path does not matter, and a closed curve gives $0$.`,
    pdf: 'practice/mth425/set9.pdf',
    problems: [
      {
        id: 'mth425-lab9-p1',
        label: 'P1',
        method: String.raw`div, curl, and the 3D test`,
        statement: String.raw`Let $\mathbf F = \langle x^2y,\; yz,\; xz^2\rangle$ and $\mathbf G = \langle 2xyz,\; x^2z,\; x^2y\rangle$.

(a) Find $\operatorname{div}\mathbf F$ and $\operatorname{curl}\mathbf F$, and check that $\operatorname{div}(\operatorname{curl}\mathbf F) = 0$.

(b) Is $\mathbf G$ conservative? If so, find a potential by inspection.

(c) Is $\mathbf F$ conservative?`,
        solution: String.raw`(a) Here $P = x^2y$, $Q = yz$, $R = xz^2$.

$$\operatorname{div}\mathbf F = 2xy + z + 2xz$$

For the curl, take the three components in turn:

$$R_y - Q_z = 0 - y = -y, \qquad P_z - R_x = 0 - z^2 = -z^2, \qquad Q_x - P_y = 0 - x^2 = -x^2$$

$$\boxed{\operatorname{div}\mathbf F = 2xy + z + 2xz, \qquad \operatorname{curl}\mathbf F = \langle -y,\; -z^2,\; -x^2\rangle}$$

The check: $\operatorname{div}\langle -y, -z^2, -x^2\rangle = 0 + 0 + 0 = 0$. This holds for the curl of any
field with continuous second partials, so it catches arithmetic slips in the curl.

(b) For $\mathbf G$, $P = 2xyz$, $Q = x^2z$, $R = x^2y$:

$$R_y - Q_z = x^2 - x^2 = 0, \qquad P_z - R_x = 2xy - 2xy = 0, \qquad Q_x - P_y = 2xz - 2xz = 0$$

$\operatorname{curl}\mathbf G = \mathbf 0$ and $\mathbf G$ is defined and smooth on all of $\mathbb R^3$, which
is simply connected, so $\mathbf G$ is conservative. Looking at the first component, $2xyz$ is
$\partial_x(x^2yz)$, and then $\partial_y(x^2yz) = x^2z$ and $\partial_z(x^2yz) = x^2y$ both match.

$$\boxed{\mathbf G \text{ is conservative, with potential } \varphi = x^2yz + C}$$

(c) $\operatorname{curl}\mathbf F = \langle -y, -z^2, -x^2\rangle$ is not the zero vector. At $(1,1,1)$ it is
$\langle -1,-1,-1\rangle$. One point is enough.

$$\boxed{\mathbf F \text{ is not conservative}}$$`,
      },
      {
        id: 'mth425-lab9-p2',
        label: 'P2',
        method: String.raw`$M_y = N_x$, and when it is not enough`,
        statement: String.raw`Decide which of these 2D fields are conservative. When the answer is yes, find a potential. When it
is no, give a closed curve that proves it.

(a) $\mathbf F = \langle e^x\sin y + 2x,\; e^x\cos y\rangle$

(b) $\mathbf F = \langle y^2,\; x^2\rangle$

(c) $\mathbf F = \left\langle \dfrac{-y}{x^2+y^2},\; \dfrac{x}{x^2+y^2}\right\rangle$ on the domain $\mathbb R^2$ minus the origin`,
        solution: String.raw`(a) $M = e^x\sin y + 2x$ and $N = e^x\cos y$, defined on all of $\mathbb R^2$.

$$M_y = e^x\cos y, \qquad N_x = e^x\cos y$$

Equal on a simply connected domain, so conservative. Integrate $\varphi_x = M$ with respect to $x$:

$$\varphi = e^x\sin y + x^2 + g(y)$$

Then $\varphi_y = e^x\cos y + g'(y)$ must equal $N = e^x\cos y$, so $g' = 0$.

$$\boxed{\text{(a) conservative, } \varphi = e^x\sin y + x^2}$$

(b) $M = y^2$, $N = x^2$: $M_y = 2y$ and $N_x = 2x$. These differ wherever $y \ne x$.

$$\boxed{\text{(b) not conservative}}$$

(c) Compute both partials with the quotient rule, writing $r^2 = x^2 + y^2$:

$$M_y = \frac{-r^2 + 2y^2}{r^4} = \frac{y^2 - x^2}{r^4}, \qquad
N_x = \frac{r^2 - 2x^2}{r^4} = \frac{y^2 - x^2}{r^4}$$

They are equal, but the test is not enough here. The domain is $\mathbb R^2$ with the origin removed,
which has a hole, so $M_y = N_x$ no longer guarantees a potential. Test the unit circle, oriented
counterclockwise, $\mathbf r(t) = \langle\cos t, \sin t\rangle$, $0 \le t \le 2\pi$. On it $r^2 = 1$, so
$\mathbf F(\mathbf r(t)) = \langle -\sin t, \cos t\rangle$ and $\mathbf r'(t) = \langle -\sin t, \cos t\rangle$:

$$\oint_C \mathbf F\cdot d\mathbf r = \int_0^{2\pi}(\sin^2 t + \cos^2 t)\,dt = 2\pi \ne 0$$

A conservative field gives $0$ on every closed curve.

$$\boxed{\text{(c) not conservative: } \oint_C \mathbf F\cdot d\mathbf r = 2\pi \text{ on the unit circle, counterclockwise}}$$`,
      },
      {
        id: 'mth425-lab9-p3',
        label: 'P3',
        method: String.raw`scalar line integrals, $ds = |\mathbf r'|\,dt$`,
        statement: String.raw`Evaluate $\displaystyle\int_C f\,ds$.

(a) $f(x,y) = x$, and $C$ is the part of the parabola $y = x^2$ from $(0,0)$ to $(1,1)$.

(b) $f(x,y,z) = x^2 + y^2 + z^2$, and $C$ is the helix $\mathbf r(t) = \langle\cos t,\ \sin t,\ t\rangle$,
$0 \le t \le 2\pi$.`,
        solution: String.raw`(a) Parameterize with $x = t$: $\mathbf r(t) = \langle t, t^2\rangle$, $0 \le t \le 1$. Then
$\mathbf r' = \langle 1, 2t\rangle$ and $ds = \sqrt{1 + 4t^2}\,dt$. On $C$, $f = x = t$.

$$\int_C x\,ds = \int_0^1 t\sqrt{1 + 4t^2}\,dt$$

Let $u = 1 + 4t^2$, so $du = 8t\,dt$, with $u$ running from $1$ to $5$:

$$\int_0^1 t\sqrt{1+4t^2}\,dt = \frac{1}{8}\int_1^5 u^{1/2}\,du = \frac{1}{8}\cdot\frac{2}{3}\Big[u^{3/2}\Big]_1^5
= \frac{1}{12}\big(5\sqrt5 - 1\big)$$

$$\boxed{\int_C x\,ds = \frac{5\sqrt5 - 1}{12} \approx 0.8484}$$

(b) $\mathbf r'(t) = \langle -\sin t,\ \cos t,\ 1\rangle$, so $|\mathbf r'| = \sqrt{\sin^2 t + \cos^2 t + 1} = \sqrt2$,
a constant. On $C$, $x^2 + y^2 + z^2 = \cos^2 t + \sin^2 t + t^2 = 1 + t^2$.

$$\int_C (x^2+y^2+z^2)\,ds = \sqrt2\int_0^{2\pi}(1 + t^2)\,dt = \sqrt2\Big(2\pi + \frac{8\pi^3}{3}\Big)$$

$$\boxed{\int_C (x^2+y^2+z^2)\,ds = \sqrt2\Big(2\pi + \frac{8\pi^3}{3}\Big) = \frac{2\sqrt2\,\pi\,(3 + 4\pi^2)}{3} \approx 125.8}$$

Running the helix backward gives the same number, because $ds = |\mathbf r'|\,dt$ is always positive.`,
      },
      {
        id: 'mth425-lab9-p4',
        label: 'P4',
        method: String.raw`work, orientation stated first`,
        statement: String.raw`Find the work done by $\mathbf F = \langle y,\ x^2\rangle$ along the upper half of the circle
$x^2 + y^2 = 4$, from $(2,0)$ to $(-2,0)$. Then say what the work is for the opposite direction.`,
        solution: String.raw`The path leaves $(2,0)$, passes over $(0,2)$ and arrives at $(-2,0)$, which is counterclockwise.
Parameterize with that orientation:

$$\mathbf r(t) = \langle 2\cos t,\ 2\sin t\rangle, \qquad 0 \le t \le \pi$$

At $t = 0$ this is $(2,0)$ and at $t = \pi$ it is $(-2,0)$, so increasing $t$ matches the stated
direction. Then $\mathbf r'(t) = \langle -2\sin t,\ 2\cos t\rangle$ and
$\mathbf F(\mathbf r(t)) = \langle 2\sin t,\ 4\cos^2 t\rangle$.

$$\mathbf F\cdot\mathbf r' = -4\sin^2 t + 8\cos^3 t$$

$$W = \int_0^\pi\big(-4\sin^2 t + 8\cos^3 t\big)\,dt$$

Use $\sin^2 t = \tfrac12(1 - \cos 2t)$, which gives $\int_0^\pi\sin^2 t\,dt = \tfrac{\pi}{2}$. For the
cubic, $\cos^3 t = (1 - \sin^2 t)\cos t$ has antiderivative $\sin t - \tfrac13\sin^3 t$, which is $0$
at both $0$ and $\pi$. So

$$W = -4\cdot\frac{\pi}{2} + 8\cdot 0 = -2\pi$$

$$\boxed{W = -2\pi \text{ for the counterclockwise path from } (2,0) \text{ to } (-2,0)}$$

Going from $(-2,0)$ to $(2,0)$ over the same arc reverses the orientation and flips the sign:
$W = +2\pi$. Check: $\mathbf r(t) = \langle 2\cos(\pi - t),\ 2\sin(\pi - t)\rangle$ on $0 \le t \le \pi$
gives exactly $+2\pi$.`,
      },
      {
        id: 'mth425-lab9-p5',
        label: 'P5',
        method: String.raw`the $P\,dx + Q\,dy + R\,dz$ form`,
        statement: String.raw`Evaluate $\displaystyle\int_C y\,dx + z\,dy + x\,dz$, where $C$ is the twisted cubic $x = t,\ y = t^2,\ z = t^3$,
traced from $(0,0,0)$ to $(1,1,1)$ as $t$ goes from $0$ to $1$. Is there a shortcut?`,
        solution: String.raw`The integral is the work of $\mathbf F = \langle y, z, x\rangle$ along $C$. Substitute $x = t$,
$y = t^2$, $z = t^3$, along with $dx = dt$, $dy = 2t\,dt$, $dz = 3t^2\,dt$:

$$y\,dx = t^2\,dt, \qquad z\,dy = t^3\cdot 2t\,dt = 2t^4\,dt, \qquad x\,dz = t\cdot 3t^2\,dt = 3t^3\,dt$$

$$\int_C y\,dx + z\,dy + x\,dz = \int_0^1\big(t^2 + 3t^3 + 2t^4\big)\,dt = \frac{1}{3} + \frac{3}{4} + \frac{2}{5} = \frac{20 + 45 + 24}{60}$$

$$\boxed{\int_C y\,dx + z\,dy + x\,dz = \frac{89}{60}}$$

No shortcut: $\operatorname{curl}\langle y, z, x\rangle = \langle R_y - Q_z,\ P_z - R_x,\ Q_x - P_y\rangle = \langle -1, -1, -1\rangle \ne \mathbf 0$,
so the field is not conservative and the value depends on the path. Another curve from $(0,0,0)$ to
$(1,1,1)$, such as the straight segment, would give a different number. Traced from $(1,1,1)$ back
to the origin the same curve gives $-\tfrac{89}{60}$.`,
      },
      {
        id: 'mth425-lab9-p6',
        label: 'P6',
        method: String.raw`potential function in 3D, then the fundamental theorem`,
        statement: String.raw`Let $\mathbf F = \langle 2xyz,\ x^2z + e^z,\ x^2y + ye^z\rangle$. Show that $\mathbf F$ is conservative,
find a potential, and use it to find $\displaystyle\int_C\mathbf F\cdot d\mathbf r$, where $C$ is the
helix $\mathbf r(t) = \langle\cos t,\ \sin t,\ t\rangle$ from $t = 0$ to $t = \pi/2$.`,
        solution: String.raw`**Test.** $P = 2xyz$, $Q = x^2z + e^z$, $R = x^2y + ye^z$.

$$R_y - Q_z = (x^2 + e^z) - (x^2 + e^z) = 0, \qquad P_z - R_x = 2xy - 2xy = 0, \qquad Q_x - P_y = 2xz - 2xz = 0$$

The curl is zero on all of $\mathbb R^3$, so $\mathbf F$ is conservative.

**Potential.** Integrate $\varphi_x = 2xyz$ in $x$:

$$\varphi = x^2yz + g(y,z)$$

Match $\varphi_y = x^2z + g_y$ to $Q = x^2z + e^z$, so $g_y = e^z$ and $g = ye^z + h(z)$. Now

$$\varphi = x^2yz + ye^z + h(z)$$

Match $\varphi_z = x^2y + ye^z + h'(z)$ to $R = x^2y + ye^z$, so $h' = 0$.

$$\varphi = x^2yz + ye^z$$

**Evaluate.** The helix starts at $\mathbf r(0) = (1, 0, 0)$ and ends at $\mathbf r(\pi/2) = (0, 1, \pi/2)$,
with increasing $t$ as the orientation.

$$\varphi(1,0,0) = 0 + 0 = 0, \qquad \varphi\big(0, 1, \tfrac\pi2\big) = 0 + 1\cdot e^{\pi/2} = e^{\pi/2}$$

$$\boxed{\varphi = x^2yz + ye^z, \qquad \int_C\mathbf F\cdot d\mathbf r = \varphi(B) - \varphi(A) = e^{\pi/2} \approx 4.810}$$

Parameterizing the helix directly would need $\int_0^{\pi/2}$ of a sum of products of trigonometric
functions with $t$ and $e^t$. The theorem skips all of it, and any other curve from $(1,0,0)$ to
$(0,1,\pi/2)$ gives the same value.`,
      },
      {
        id: 'mth425-lab9-p7',
        label: 'P7',
        method: String.raw`2D potential, open path, closed path`,
        statement: String.raw`Let $\mathbf F = \langle 3x^2y^2 - \cos y,\ \ 2x^3y + x\sin y\rangle$.

(a) Show that $\mathbf F$ is conservative and find a potential.

(b) Evaluate $\displaystyle\int_C\mathbf F\cdot d\mathbf r$, where $C$ is the curve $\mathbf r(t) = \langle t^2,\ \pi t\rangle$,
$0 \le t \le 1$, oriented in the direction of increasing $t$.

(c) Evaluate $\displaystyle\oint_{C'}\mathbf F\cdot d\mathbf r$, where $C'$ is the circle of radius $2$ centered at the
origin, traversed once counterclockwise.`,
        solution: String.raw`(a) $M = 3x^2y^2 - \cos y$ and $N = 2x^3y + x\sin y$ are defined on all of $\mathbb R^2$.

$$M_y = 6x^2y + \sin y, \qquad N_x = 6x^2y + \sin y$$

Equal on a simply connected domain, so $\mathbf F$ is conservative. Integrate $\varphi_x = M$:

$$\varphi = x^3y^2 - x\cos y + g(y)$$

Then $\varphi_y = 2x^3y + x\sin y + g'(y)$ matches $N$ when $g' = 0$.

$$\varphi = x^3y^2 - x\cos y$$

(b) The curve starts at $\mathbf r(0) = (0,0)$ and ends at $\mathbf r(1) = (1, \pi)$. It is an arc of the
parabola $x = y^2/\pi^2$. Its shape does not matter, only the endpoints:

$$\varphi(1,\pi) = \pi^2 - \cos\pi = \pi^2 + 1, \qquad \varphi(0,0) = 0 - 0 = 0$$

$$\boxed{\int_C\mathbf F\cdot d\mathbf r = \varphi(1,\pi) - \varphi(0,0) = \pi^2 + 1 \approx 10.87}$$

(c) A closed curve starts and ends at the same point $A$, so $\varphi(B) - \varphi(A) = 0$. The circle
lies in the domain $\mathbb R^2$ where $\mathbf F$ is smooth, so the theorem applies.

$$\boxed{\oint_{C'}\mathbf F\cdot d\mathbf r = 0}$$

Contrast this with problem 2(c). There the field was undefined at the origin, which the circle
encloses, so the closed-curve argument failed. Here nothing is missing inside the circle.`,
      },
      {
        id: 'mth425-lab9-p8',
        label: 'P8',
        method: String.raw`not conservative, so parameterize every path`,
        statement: String.raw`Let $\mathbf F = \langle xy,\ x^2\rangle$. Test whether $\mathbf F$ is conservative. Then find the work from
$(0,0)$ to $(1,1)$ along

(a) $C_1$: the straight line $y = x$, and

(b) $C_2$: the parabola $y = x^2$,

both oriented from $(0,0)$ toward $(1,1)$. Finally, find $\displaystyle\oint\mathbf F\cdot d\mathbf r$ for the closed
curve that follows $C_2$ out to $(1,1)$ and returns along $C_1$ reversed.`,
        solution: String.raw`**Test.** $M = xy$ and $N = x^2$. $M_y = x$ and $N_x = 2x$. These differ for every $x \ne 0$, so
$\mathbf F$ is not conservative. No potential exists, so the endpoints alone do not determine the
work and each path has to be parameterized.

(a) $C_1$: $\mathbf r(t) = \langle t, t\rangle$, $0 \le t \le 1$. Then $dx = dt$, $dy = dt$ and
$\mathbf F(\mathbf r(t)) = \langle t^2, t^2\rangle$.

$$\int_{C_1}\mathbf F\cdot d\mathbf r = \int_0^1 (t^2 + t^2)\,dt = \int_0^1 2t^2\,dt = \frac{2}{3}$$

(b) $C_2$: $\mathbf r(t) = \langle t, t^2\rangle$, $0 \le t \le 1$. Then $dx = dt$, $dy = 2t\,dt$ and
$\mathbf F(\mathbf r(t)) = \langle t^3, t^2\rangle$.

$$\int_{C_2}\mathbf F\cdot d\mathbf r = \int_0^1\big(t^3 + t^2\cdot 2t\big)\,dt = \int_0^1 3t^3\,dt = \frac{3}{4}$$

The two paths share endpoints and disagree, which confirms the test: $\tfrac23 \ne \tfrac34$.

The closed curve is $C_2$ followed by $-C_1$, and reversing a path negates the integral:

$$\oint\mathbf F\cdot d\mathbf r = \int_{C_2}\mathbf F\cdot d\mathbf r - \int_{C_1}\mathbf F\cdot d\mathbf r = \frac34 - \frac23 = \frac{1}{12}$$

$$\boxed{\int_{C_1}\mathbf F\cdot d\mathbf r = \frac23, \qquad \int_{C_2}\mathbf F\cdot d\mathbf r = \frac34, \qquad \oint\mathbf F\cdot d\mathbf r = \frac{1}{12} \ne 0}$$

A conservative field would give $0$ for the loop. A third route, along the $x$-axis to $(1,0)$ and
then straight up to $(1,1)$, gives $0 + 1 = 1$: along the axis $y = 0$ and $dy = 0$ so $\mathbf F\cdot d\mathbf r = 0$,
and up the line $x = 1$ the integrand is $x^2\,dy = dy$. That is a third value for the same endpoints.`,
      },
    ],
  },
  {
    id: 'mth425-lab10',
    number: 10,
    title: 'Double integrals and Green\'s theorem',
    ref: 'Zill §9.10, 9.11, 9.12',
    blurb: 'Quiz prep. Closed book, about 10 minutes per problem. Problems 1 to 3 are iterated integrals (both orders, reversing the order, area and volume), problem 4 is polar coordinates, and problems 5 to 8 are Green\'s theorem. No figures are given: sketch each region yourself from the description, and write its limits before you integrate. Every answer was recomputed independently, and the Green\'s theorem problems were checked on both sides.',
    intro: String.raw`**Iterated integrals.** Type I region: $a \le x \le b,\ g_1(x) \le y \le g_2(x)$, and
$$\iint_R f\,dA = \int_a^b\!\int_{g_1(x)}^{g_2(x)} f\,dy\,dx$$
Type II region: $c \le y \le d,\ h_1(y) \le x \le h_2(y)$, and
$\iint_R f\,dA = \int_c^d\!\int_{h_1(y)}^{h_2(y)} f\,dx\,dy$. The inner limits may depend on the
outer variable; the outer limits are constants. Area is $\iint_R dA$; the volume under $z = f \ge 0$
over $R$ is $\iint_R f\,dA$. To reverse the order, sketch $R$, then read the limits the other way.

**Polar coordinates.** $x = r\cos\theta,\ y = r\sin\theta,\ x^2 + y^2 = r^2$, and
$$dA = r\,dr\,d\theta$$
The extra factor $r$ is the Jacobian and is never optional. Circle $x^2 + y^2 = 2ax$ is
$r = 2a\cos\theta$.

**Green's theorem.** If $C$ is a piecewise smooth, simple, closed curve, positively oriented
(counterclockwise, region on the left), $R$ is the region it encloses, and $P, Q$ have continuous
first partials on an open region containing $R$ and $C$, then
$$\oint_C P\,dx + Q\,dy = \iint_R \Big(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\Big)dA$$
Clockwise traversal flips the sign. **Area:**
$A = \tfrac{1}{2}\oint_C x\,dy - y\,dx$ (also $\oint x\,dy$ or $-\oint y\,dx$ alone).`,
    pdf: 'practice/mth425/set10.pdf',
    problems: [
      {
        id: 'mth425-lab10-p1',
        label: 'P1',
        method: String.raw`the same region in both orders`,
        statement: String.raw`Let $R$ be the region bounded by the curves $y = x$ and $y = x^2$. Evaluate
$\displaystyle\iint_R (x + 2y)\,dA$ as a Type I integral, then again as a Type II integral, and
confirm the two agree.`,
        solution: String.raw`The curves meet where $x = x^2$, that is at $(0,0)$ and $(1,1)$. For $0 < x < 1$ we have
$x^2 < x$, so the parabola is the lower boundary and the line the upper one.

**Type I.** $0 \le x \le 1,\ x^2 \le y \le x$.

$$\int_0^1\!\int_{x^2}^{x} (x + 2y)\,dy\,dx = \int_0^1 \Big[xy + y^2\Big]_{x^2}^{x} dx
= \int_0^1 \big(2x^2 - x^3 - x^4\big)\,dx = \frac{2}{3} - \frac{1}{4} - \frac{1}{5} = \frac{13}{60}$$

**Type II.** Solve each curve for $x$: the line is $x = y$ and the parabola is $x = \sqrt{y}$. For
$0 < y < 1$, $y < \sqrt{y}$, so $0 \le y \le 1,\ y \le x \le \sqrt{y}$.

$$\int_0^1\!\int_{y}^{\sqrt{y}} (x + 2y)\,dx\,dy = \int_0^1 \Big[\frac{x^2}{2} + 2xy\Big]_{y}^{\sqrt{y}} dy
= \int_0^1 \Big(\frac{y}{2} + 2y^{3/2} - \frac{5y^2}{2}\Big)dy = \frac{1}{4} + \frac{4}{5} - \frac{5}{6} = \frac{13}{60}$$

$$\boxed{\iint_R (x + 2y)\,dA = \frac{13}{60}}$$

Both orders agree, as they must. Here Type I was a little shorter; the point of the exercise is
that either order works when both boundaries are single-valued functions.`,
      },
      {
        id: 'mth425-lab10-p2',
        label: 'P2',
        method: String.raw`when the given order cannot be integrated, or needs splitting`,
        statement: String.raw`Evaluate by reversing the order of integration.

(a) $\displaystyle\int_0^2\!\int_{x/2}^{1} e^{y^2}\,dy\,dx$

(b) $\displaystyle\int_0^1\!\int_{x}^{2-x} y\,dy\,dx$, written first as a sum of Type II integrals.`,
        solution: String.raw`**(a)** $\int e^{y^2}\,dy$ has no elementary antiderivative, so integrating $y$ first fails. The
region is $0 \le x \le 2,\ x/2 \le y \le 1$: a triangle with vertices $(0,0)$, $(2,1)$, $(0,1)$,
bounded by the line $y = x/2$ (so $x = 2y$), the line $y = 1$ and the $y$-axis. Reading it the other
way, $y$ runs from 0 to 1 and, at each $y$, $x$ runs from the $y$-axis to the line, so
$0 \le y \le 1,\ 0 \le x \le 2y$.

$$\int_0^1\!\int_0^{2y} e^{y^2}\,dx\,dy = \int_0^1 2y\,e^{y^2}\,dy = \Big[e^{y^2}\Big]_0^1 = e - 1$$

The factor $y$ from the inner integral is exactly what the substitution $u = y^2$ needs.

**(b)** The region is $0 \le x \le 1,\ x \le y \le 2 - x$: a triangle with vertices $(0,0)$, $(0,2)$,
$(1,1)$, bounded by $y = x$ below, $y = 2 - x$ above and the $y$-axis on the left. The two slanted
sides meet at $(1,1)$, and the right-hand boundary changes formula there. For $0 \le y \le 1$ the
right edge is $x = y$; for $1 \le y \le 2$ it is $x = 2 - y$. So the region splits at $y = 1$:

$$\int_0^1\!\int_0^{y} y\,dx\,dy + \int_1^2\!\int_0^{2-y} y\,dx\,dy
= \int_0^1 y^2\,dy + \int_1^2 y(2 - y)\,dy
= \frac{1}{3} + \Big[y^2 - \frac{y^3}{3}\Big]_1^2 = \frac{1}{3} + \frac{4}{3} - \frac{2}{3} = 1$$

Check in the original order: $\int_0^1\tfrac{1}{2}\big[(2-x)^2 - x^2\big]dx = \int_0^1(2 - 2x)\,dx = 1$.

$$\boxed{\text{(a) } e - 1, \qquad \text{(b) } 1}$$

In (b) the reversal was optional, since the original order was easy; it is there to show the
split. A region whose right or left boundary changes formula needs one integral per formula.`,
      },
      {
        id: 'mth425-lab10-p3',
        label: 'P3',
        method: String.raw`area and volume as double integrals`,
        statement: String.raw`(a) Find the area of the region $R$ enclosed by the parabola $y = x^2$ and the line $y = 2x + 3$.

(b) Find the volume of the solid bounded above by the plane $z = 4 - y$, below by the $xy$-plane,
and on the sides by the parabolic cylinder $y = x^2$.`,
        solution: String.raw`**(a)** The curves meet where $x^2 = 2x + 3$, that is $(x - 3)(x + 1) = 0$, so at $(-1, 1)$ and
$(3, 9)$. Between them the line is above the parabola (at $x = 0$: $3 > 0$). So
$-1 \le x \le 3,\ x^2 \le y \le 2x + 3$.

$$A = \iint_R dA = \int_{-1}^{3}\!\int_{x^2}^{2x+3} dy\,dx = \int_{-1}^{3}\big(2x + 3 - x^2\big)\,dx
= \Big[x^2 + 3x - \frac{x^3}{3}\Big]_{-1}^{3}$$

At $x = 3$: $9 + 9 - 9 = 9$. At $x = -1$: $1 - 3 + \tfrac{1}{3} = -\tfrac{5}{3}$. So
$A = 9 + \tfrac{5}{3} = \tfrac{32}{3}$.

**(b)** The base region $R$ is where the solid meets the plane $z = 0$. On that plane $z = 4 - y$
is zero at $y = 4$, and the cylinder $y = x^2$ meets $y = 4$ at $x = \pm 2$. So the base is
$-2 \le x \le 2,\ x^2 \le y \le 4$, and on it $4 - y \ge 0$, so the plane really is the upper surface.

$$V = \iint_R (4 - y)\,dA = \int_{-2}^{2}\!\int_{x^2}^{4} (4 - y)\,dy\,dx
= \int_{-2}^{2} \frac{(4 - x^2)^2}{2}\,dx$$

since $\int_{x^2}^4 (4 - y)\,dy = \big[-\tfrac{(4-y)^2}{2}\big]_{x^2}^4 = \tfrac{(4 - x^2)^2}{2}$. Expand
and use symmetry:

$$V = \int_0^{2}\big(16 - 8x^2 + x^4\big)\,dx = 32 - \frac{64}{3} + \frac{32}{5} = \frac{256}{15}$$

$$\boxed{\text{(a) } A = \frac{32}{3}, \qquad \text{(b) } V = \frac{256}{15}}$$

Check (b) with the order reversed: $\int_0^4\!\int_{-\sqrt{y}}^{\sqrt{y}}(4 - y)\,dx\,dy
= \int_0^4 2\sqrt{y}\,(4 - y)\,dy = 2\big(\tfrac{64}{3} - \tfrac{64}{5}\big) = \tfrac{256}{15}$.`,
      },
      {
        id: 'mth425-lab10-p4',
        label: 'P4',
        method: String.raw`converting the region, the integrand, and the area element`,
        statement: String.raw`(a) Evaluate $\displaystyle\int_0^2\!\int_0^{\sqrt{4 - x^2}} e^{-(x^2 + y^2)}\,dy\,dx$ by converting to
polar coordinates.

(b) Evaluate $\displaystyle\iint_D x\,dA$, where $D$ is the disk $x^2 + y^2 \le 2x$.

(c) Find the volume of the solid between the paraboloid $z = 9 - x^2 - y^2$ and the $xy$-plane.`,
        solution: String.raw`**(a)** The region is $0 \le x \le 2,\ 0 \le y \le \sqrt{4 - x^2}$: the quarter of the disk
$x^2 + y^2 \le 4$ in the first quadrant. In polar form that is $0 \le r \le 2,\ 0 \le \theta \le \pi/2$.
The integrand becomes $e^{-r^2}$ and $dA = r\,dr\,d\theta$.

$$\int_0^{\pi/2}\!\int_0^2 e^{-r^2}\,r\,dr\,d\theta = \frac{\pi}{2}\Big[-\frac{1}{2}e^{-r^2}\Big]_0^2
= \frac{\pi}{2}\cdot\frac{1 - e^{-4}}{2} = \frac{\pi\,(1 - e^{-4})}{4}$$

In rectangular coordinates the inner integral $\int e^{-y^2}dy$ is not elementary; the leftover $r$
from $dA$ is what lets the $r$-integral close.

**(b)** Complete the square: $x^2 - 2x + y^2 \le 0$ gives $(x - 1)^2 + y^2 \le 1$, the disk of
radius 1 centred at $(1, 0)$. In polar form, $r^2 \le 2r\cos\theta$, so $0 \le r \le 2\cos\theta$.
The disk lies in $x \ge 0$, so $-\pi/2 \le \theta \le \pi/2$. The integrand is $x = r\cos\theta$.

$$\iint_D x\,dA = \int_{-\pi/2}^{\pi/2}\!\int_0^{2\cos\theta} r\cos\theta\cdot r\,dr\,d\theta
= \int_{-\pi/2}^{\pi/2}\cos\theta\,\frac{8\cos^3\theta}{3}\,d\theta = \frac{8}{3}\int_{-\pi/2}^{\pi/2}\cos^4\theta\,d\theta$$

With $\int_{-\pi/2}^{\pi/2}\cos^4\theta\,d\theta = \tfrac{3\pi}{8}$ (use $\cos^2\theta = \tfrac{1 + \cos 2\theta}{2}$
twice), the value is $\tfrac{8}{3}\cdot\tfrac{3\pi}{8} = \pi$. As a check, $x = 1$ is the centroid of the
disk and its area is $\pi$, so $\iint x\,dA = 1\cdot\pi$.

**(c)** The paraboloid meets $z = 0$ on the circle $x^2 + y^2 = 9$, so the base is the disk
$0 \le r \le 3,\ 0 \le \theta \le 2\pi$, and $z = 9 - r^2$ there.

$$V = \int_0^{2\pi}\!\int_0^3 (9 - r^2)\,r\,dr\,d\theta = 2\pi\Big[\frac{9r^2}{2} - \frac{r^4}{4}\Big]_0^3
= 2\pi\Big(\frac{81}{2} - \frac{81}{4}\Big) = \frac{81\pi}{2}$$

$$\boxed{\text{(a) } \frac{\pi\,(1 - e^{-4})}{4}, \qquad \text{(b) } \pi, \qquad \text{(c) } \frac{81\pi}{2}}$$`,
      },
      {
        id: 'mth425-lab10-p5',
        label: 'P5',
        method: String.raw`both sides of the theorem`,
        statement: String.raw`Verify Green's theorem for $\displaystyle\oint_C xy\,dx + x^2\,dy$, where $C$ is the triangle with
vertices $(0,0)$, $(1,0)$, $(1,2)$, traversed counterclockwise. Compute the line integral directly and
the double integral, and compare.`,
        solution: String.raw`**Hypotheses.** $C$ is a simple closed piecewise smooth curve (three straight segments), positively
oriented as stated, and $P = xy$, $Q = x^2$ are polynomials, so their partials are continuous
everywhere. Green's theorem applies.

**Double integral.** $Q_x = 2x$ and $P_y = x$, so $Q_x - P_y = x$. The triangle is bounded by
$y = 0$, $x = 1$ and the line $y = 2x$ from $(0,0)$ to $(1,2)$, so
$0 \le x \le 1,\ 0 \le y \le 2x$.

$$\iint_R x\,dA = \int_0^1\!\int_0^{2x} x\,dy\,dx = \int_0^1 2x^2\,dx = \frac{2}{3}$$

**Line integral.** Counterclockwise order is $(0,0)$ to $(1,0)$ to $(1,2)$ and back to $(0,0)$.

- $C_1$: $(0,0)$ to $(1,0)$, $x = t,\ y = 0$, $0 \le t \le 1$, so $dy = 0$ and $xy = 0$. The integral is $0$.
- $C_2$: $(1,0)$ to $(1,2)$, $x = 1,\ y = t$, $0 \le t \le 2$, so $dx = 0$ and $x^2\,dy = dt$.
  The integral is $\int_0^2 dt = 2$.
- $C_3$: $(1,2)$ to $(0,0)$, $x = t,\ y = 2t$, with $t$ running from 1 down to 0. Then
  $dx = dt,\ dy = 2\,dt$ and $xy\,dx + x^2\,dy = 2t^2\,dt + 2t^2\,dt = 4t^2\,dt$, so the integral is
  $\int_1^0 4t^2\,dt = -\tfrac{4}{3}$.

$$\oint_C = 0 + 2 - \frac{4}{3} = \frac{2}{3}$$

$$\boxed{\oint_C xy\,dx + x^2\,dy = \iint_R x\,dA = \frac{2}{3}}$$

Both sides give $\tfrac{2}{3}$. On $C_3$ the parameter must run from 1 to 0 to follow the
counterclockwise direction; using $0$ to $1$ would flip that piece to $+\tfrac{4}{3}$ and the sides
would no longer agree.`,
      },
      {
        id: 'mth425-lab10-p6',
        label: 'P6',
        method: String.raw`a region bounded by two curves`,
        statement: String.raw`Let $C$ be the boundary of the region between the parabola $y = x^2$ and the line $y = 2x$,
traversed counterclockwise. Use Green's theorem to evaluate
$$\oint_C -y^2\,dx + (xy + x)\,dy$$`,
        solution: String.raw`**Region.** The curves meet where $x^2 = 2x$, at $(0,0)$ and $(2,4)$. Between them the line is above
the parabola (at $x = 1$: $2 > 1$), so $0 \le x \le 2,\ x^2 \le y \le 2x$.

**Hypotheses.** $C$ is made of two smooth arcs, it is simple and closed, and $P = -y^2$,
$Q = xy + x$ are polynomials. The stated orientation is counterclockwise, which here means the
parabola is traversed left to right and the line right to left (region on the left), so the
theorem applies as written.

**Integrand.** $Q_x = y + 1$ and $P_y = -2y$, so $Q_x - P_y = 3y + 1$.

$$\iint_R (3y + 1)\,dA = \int_0^2\!\int_{x^2}^{2x}(3y + 1)\,dy\,dx
= \int_0^2\Big[\frac{3y^2}{2} + y\Big]_{x^2}^{2x} dx
= \int_0^2\Big(5x^2 + 2x - \frac{3x^4}{2}\Big)dx$$

$$= \frac{40}{3} + 4 - \frac{48}{5} = \frac{116}{15}$$

$$\boxed{\oint_C -y^2\,dx + (xy + x)\,dy = \frac{116}{15}}$$

Direct check, two pieces. On the parabola $x = t,\ y = t^2$ with $0 \le t \le 2$:
$\int_0^2(t^4 + 2t^2)\,dt = \tfrac{176}{15}$. On the line $x = t,\ y = 2t$ with $t$ from 2 down to
0: $\int_2^0 2t\,dt = -4$. The sum is $\tfrac{176}{15} - 4 = \tfrac{116}{15}$.`,
      },
      {
        id: 'mth425-lab10-p7',
        label: 'P7',
        method: String.raw`area as a line integral`,
        statement: String.raw`Use Green's area formula to find the area enclosed by the astroid
$$x = 2\cos^3 t, \qquad y = 2\sin^3 t, \qquad 0 \le t \le 2\pi$$`,
        solution: String.raw`The curve is simple and closed ($t = 0$ and $t = 2\pi$ give the same point $(2, 0)$) and is smooth
except at its four cusps, so it is piecewise smooth. As $t$ increases from 0 it moves from $(2,0)$
toward $(0,2)$, so it is traversed counterclockwise and the area formula
$A = \tfrac{1}{2}\oint_C x\,dy - y\,dx$ applies without a sign change.

$$dx = -6\cos^2 t\sin t\,dt, \qquad dy = 6\sin^2 t\cos t\,dt$$

$$x\,dy - y\,dx = \big(12\cos^4 t\sin^2 t + 12\sin^4 t\cos^2 t\big)\,dt
= 12\sin^2 t\cos^2 t\,(\cos^2 t + \sin^2 t)\,dt = 3\sin^2 2t\,dt$$

using $\sin t\cos t = \tfrac{1}{2}\sin 2t$. Then

$$A = \frac{1}{2}\int_0^{2\pi} 3\sin^2 2t\,dt = \frac{3}{2}\int_0^{2\pi}\frac{1 - \cos 4t}{2}\,dt
= \frac{3}{2}\cdot\pi = \frac{3\pi}{2}$$

$$\boxed{A = \frac{3\pi}{2}}$$

For general half-width $a$ the same computation gives $\tfrac{3\pi a^2}{8}$; here $a = 2$ gives
$\tfrac{3\pi}{2}$. Compare with the circle of radius 2 (area $4\pi$): the astroid is much thinner,
which is the right order of magnitude.`,
      },
      {
        id: 'mth425-lab10-p8',
        label: 'P8',
        method: String.raw`reversing an orientation, and a failed hypothesis`,
        statement: String.raw`(a) Let $C$ be the circle $x^2 + y^2 = 4$ traversed **clockwise**. Evaluate
$\displaystyle\oint_C -y^3\,dx + x^3\,dy$.

(b) Let $C$ be the unit circle $x^2 + y^2 = 1$ traversed counterclockwise, and
$\displaystyle\oint_C \frac{-y\,dx + x\,dy}{x^2 + y^2}$. Show that Green's theorem cannot be used, and
find the value another way.`,
        solution: String.raw`**(a) Orientation.** Hypotheses: $C$ is a simple closed smooth curve and $P = -y^3,\ Q = x^3$ are
polynomials. But Green's theorem as stated needs positive orientation, and this $C$ is clockwise. Let
$-C$ denote the same circle counterclockwise. Reversing direction changes the sign of a line
integral, so

$$\oint_C = -\oint_{-C}$$

Apply the theorem to $-C$. $Q_x - P_y = 3x^2 + 3y^2 = 3r^2$ on the disk $0 \le r \le 2$:

$$\oint_{-C} = \iint 3r^2\cdot r\,dr\,d\theta = \int_0^{2\pi}\!\int_0^2 3r^3\,dr\,d\theta
= 2\pi\cdot\frac{3\cdot 16}{4} = 24\pi$$

$$\boxed{\text{(a) } \oint_C -y^3\,dx + x^3\,dy = -24\pi}$$

**(b) Hypothesis check.** Here $P = \dfrac{-y}{x^2 + y^2}$ and $Q = \dfrac{x}{x^2 + y^2}$ are not defined
at the origin, and the origin lies inside the disk bounded by $C$. There is no open region containing
the closed disk on which $P$ and $Q$ have continuous partials, so Green's theorem does not apply.

The failure is real, not a technicality. Away from the origin
$Q_x = \dfrac{y^2 - x^2}{(x^2 + y^2)^2} = P_y$, so a careless use of the theorem would give
$\iint 0\,dA = 0$. Compute the line integral directly instead. With $x = \cos t,\ y = \sin t$,
$0 \le t \le 2\pi$ (counterclockwise), and $x^2 + y^2 = 1$ on the curve:

$$\oint_C \frac{-y\,dx + x\,dy}{x^2 + y^2} = \int_0^{2\pi}\big(\sin^2 t + \cos^2 t\big)\,dt = 2\pi$$

$$\boxed{\text{(b) Green's theorem fails (singularity at the origin); the integral is } 2\pi \ne 0}$$

The value $2\pi$ is the total change in the polar angle around the origin. For a closed curve that
does not enclose the origin, for instance the circle of radius 1 centred at $(3, 0)$, the hypotheses do
hold and the integral is $0$.`,
      },
    ],
  },
  {
    id: 'mth425-lab11',
    number: 11,
    title: 'Surface integrals and Stokes\' theorem',
    ref: 'Zill §9.13, 9.14',
    blurb: 'Quiz prep. Closed book, about 10 minutes per problem. Problems 1 to 4 are surface area and surface integrals of scalar functions (graphs first, then parametric surfaces), problems 5 and 6 are flux integrals, problem 7 verifies Stokes\' theorem by computing both sides, and problem 8 uses Stokes\' theorem to swap a curved surface for a flat one with the same boundary. Every answer was recomputed by a second route.',
    intro: String.raw`**Scalar surface integrals.** For $S$ the graph $z = g(x,y)$ over a region $R$ of the $xy$-plane:

$$dS = \sqrt{1 + g_x^2 + g_y^2}\;dA, \qquad \iint_S f\,dS = \iint_R f\big(x,y,g(x,y)\big)\sqrt{1 + g_x^2 + g_y^2}\;dA$$

For a parametric surface $\mathbf r(u,v)$ over a parameter region $D$:

$$dS = |\mathbf r_u \times \mathbf r_v|\;dA, \qquad \iint_S f\,dS = \iint_D f\big(\mathbf r(u,v)\big)\,|\mathbf r_u \times \mathbf r_v|\;dA$$

Surface area is the case $f = 1$. Do not forget the factor $|\mathbf r_u \times \mathbf r_v|$ or the square root.

**Flux.** The flux of $\mathbf F$ through an oriented surface $S$ with unit normal $\mathbf n$ is
$\displaystyle\iint_S \mathbf F\cdot\mathbf n\,dS$. State which side $\mathbf n$ points to before computing.

- Graph $z = g(x,y)$, **upward** normal: $\mathbf n\,dS = \langle -g_x,\,-g_y,\,1\rangle\,dA$. Downward is the negative.
- Parametric: $\mathbf n\,dS = \pm\,(\mathbf r_u\times\mathbf r_v)\,dA$, with the sign chosen so the normal points the way you were told. Check one point.

**Stokes' theorem.** Let $S$ be a piecewise smooth oriented surface whose boundary $C$ is a simple closed
piecewise smooth curve, and let $\mathbf F$ have continuous first partials on an open region containing $S$. Then

$$\iint_S (\nabla\times\mathbf F)\cdot\mathbf n\,dS = \oint_C \mathbf F\cdot d\mathbf r$$

Orientation of $C$ by the right-hand rule: with the thumb along $\mathbf n$, the fingers curl in the
direction of travel on $C$. For an upward normal this means counterclockwise seen from above.`,
    pdf: 'practice/mth425/set11.pdf',
    problems: [
      {
        id: 'mth425-lab11-p1',
        label: 'P1',
        method: String.raw`area of a graph`,
        statement: String.raw`Find the area of the part of the paraboloid $z = x^2 + y^2$ that lies below the plane $z = 4$.`,
        solution: String.raw`The surface is the graph $z = g(x,y) = x^2 + y^2$, with $g_x = 2x$ and $g_y = 2y$. The plane $z = 4$
meets it where $x^2 + y^2 = 4$, so the surface lies over the disk $R: x^2 + y^2 \le 4$.

$$dS = \sqrt{1 + 4x^2 + 4y^2}\;dA$$

Switch to polar coordinates, $dA = r\,dr\,d\theta$, $0 \le r \le 2$, $0 \le \theta \le 2\pi$:

$$A = \int_0^{2\pi}\!\!\int_0^2 \sqrt{1 + 4r^2}\;r\,dr\,d\theta$$

Let $u = 1 + 4r^2$, so $du = 8r\,dr$. The limits $r = 0, 2$ become $u = 1, 17$.

$$\int_0^2 \sqrt{1 + 4r^2}\;r\,dr = \frac{1}{8}\int_1^{17} u^{1/2}\,du = \frac{1}{8}\cdot\frac{2}{3}\Big(17^{3/2} - 1\Big) = \frac{17\sqrt{17} - 1}{12}$$

$$\boxed{A = 2\pi\cdot\frac{17\sqrt{17} - 1}{12} = \frac{\pi}{6}\big(17\sqrt{17} - 1\big) \approx 36.18}$$

Sanity check: the flat disk under the surface has area $4\pi \approx 12.57$, and the paraboloid is
steep near the rim, so a surface area near three times that is reasonable.`,
      },
      {
        id: 'mth425-lab11-p2',
        label: 'P2',
        method: String.raw`scalar integral over a graph`,
        statement: String.raw`Evaluate $\displaystyle\iint_S (x^2 + y^2)\,dS$, where $S$ is the part of the cone
$z = \sqrt{x^2 + y^2}$ with $1 \le z \le 2$.`,
        solution: String.raw`$S$ is the graph of $g = \sqrt{x^2 + y^2}$ over the annulus $R: 1 \le x^2 + y^2 \le 4$. Away from the
origin $g$ is smooth, and the origin is not on $S$.

$$g_x = \frac{x}{\sqrt{x^2+y^2}}, \quad g_y = \frac{y}{\sqrt{x^2+y^2}}, \quad
g_x^2 + g_y^2 = 1 \ \Longrightarrow\ dS = \sqrt{2}\;dA$$

The integrand $f = x^2 + y^2$ does not involve $z$, so nothing needs substituting. In polar coordinates:

$$\iint_S (x^2 + y^2)\,dS = \sqrt{2}\int_0^{2\pi}\!\!\int_1^2 r^2\cdot r\,dr\,d\theta
= \sqrt{2}\cdot 2\pi\cdot\frac{2^4 - 1^4}{4} = \sqrt{2}\cdot 2\pi\cdot\frac{15}{4}$$

$$\boxed{\iint_S (x^2 + y^2)\,dS = \frac{15\sqrt{2}\,\pi}{2} \approx 33.32}$$

The $\sqrt{2}$ is the slope factor of a $45^\circ$ cone: the cone is steeper than its shadow by
exactly $1/\cos 45^\circ$.`,
      },
      {
        id: 'mth425-lab11-p3',
        label: 'P3',
        method: String.raw`area of a parametric surface`,
        statement: String.raw`The helicoid $S$ is parametrized by $\mathbf r(u,v) = \langle u\cos v,\ u\sin v,\ v\rangle$ for
$0 \le u \le 1$, $0 \le v \le \pi$. Find its surface area.`,
        solution: String.raw`The surface winds upward like a spiral ramp, so it is not a graph over a single region of the
$xy$-plane in any convenient way. Use the parametrization.

$$\mathbf r_u = \langle\cos v,\ \sin v,\ 0\rangle, \qquad \mathbf r_v = \langle -u\sin v,\ u\cos v,\ 1\rangle$$

$$\mathbf r_u\times\mathbf r_v =
\begin{vmatrix} \mathbf i & \mathbf j & \mathbf k \\ \cos v & \sin v & 0 \\ -u\sin v & u\cos v & 1\end{vmatrix}
= \langle \sin v,\ -\cos v,\ u\cos^2 v + u\sin^2 v\rangle = \langle \sin v,\ -\cos v,\ u\rangle$$

$$|\mathbf r_u\times\mathbf r_v| = \sqrt{\sin^2 v + \cos^2 v + u^2} = \sqrt{1 + u^2}$$

The parameter region is the rectangle $0 \le u \le 1$, $0 \le v \le \pi$, so

$$A = \int_0^\pi\!\!\int_0^1 \sqrt{1 + u^2}\;du\,dv = \pi\int_0^1 \sqrt{1 + u^2}\;du$$

Use $\displaystyle\int\sqrt{1+u^2}\,du = \tfrac{1}{2}\Big[u\sqrt{1+u^2} + \ln\big(u + \sqrt{1+u^2}\big)\Big]$
(trigonometric substitution $u = \tan t$):

$$\int_0^1 \sqrt{1+u^2}\,du = \frac{1}{2}\Big[\sqrt{2} + \ln\big(1 + \sqrt{2}\big)\Big]$$

$$\boxed{A = \frac{\pi}{2}\Big[\sqrt{2} + \ln\big(1 + \sqrt{2}\big)\Big] \approx 3.608}$$

Sanity check: the shadow of the surface on the $xy$-plane is a half-disk of radius 1, area
$\pi/2 \approx 1.571$. The ramp is tilted, so its area must be larger than that, and $3.608$ is.`,
      },
      {
        id: 'mth425-lab11-p4',
        label: 'P4',
        method: String.raw`scalar integral where the surface is not a graph over the xy-plane`,
        statement: String.raw`Evaluate $\displaystyle\iint_S x^2 z\,dS$, where $S$ is the cylinder $x^2 + y^2 = 4$ with $0 \le z \le 3$
(the curved side only, no end caps).`,
        solution: String.raw`The cylinder is not a graph $z = g(x,y)$, since many points share one $(x,y)$. Parametrize it by
the angle and the height:

$$\mathbf r(\theta,z) = \langle 2\cos\theta,\ 2\sin\theta,\ z\rangle, \qquad 0 \le \theta \le 2\pi,\ \ 0 \le z \le 3$$

$$\mathbf r_\theta = \langle -2\sin\theta,\ 2\cos\theta,\ 0\rangle, \qquad \mathbf r_z = \langle 0,\ 0,\ 1\rangle$$

$$\mathbf r_\theta\times\mathbf r_z = \langle 2\cos\theta,\ 2\sin\theta,\ 0\rangle, \qquad |\mathbf r_\theta\times\mathbf r_z| = 2$$

So $dS = 2\,d\theta\,dz$, the circumference element $2\,d\theta$ times the height element. On $S$,
$x^2 z = 4\cos^2\theta\; z$:

$$\iint_S x^2 z\,dS = \int_0^{3}\!\!\int_0^{2\pi} 4\cos^2\theta\;z\cdot 2\;d\theta\,dz
= 8\Big(\int_0^{2\pi}\cos^2\theta\,d\theta\Big)\Big(\int_0^3 z\,dz\Big) = 8\cdot\pi\cdot\frac{9}{2}$$

$$\boxed{\iint_S x^2 z\,dS = 36\pi \approx 113.1}$$`,
      },
      {
        id: 'mth425-lab11-p5',
        label: 'P5',
        method: String.raw`flux through a graph, upward normal`,
        statement: String.raw`Let $S$ be the part of the paraboloid $z = 4 - x^2 - y^2$ that lies above the $xy$-plane, oriented
**upward** (the normal has a positive $\mathbf k$ component). Find the flux of
$\mathbf F = \langle x,\ y,\ z\rangle$ through $S$.`,
        solution: String.raw`Orientation: upward. The surface is the graph of $g = 4 - x^2 - y^2$, with $g_x = -2x$, $g_y = -2y$,
over the disk $R: x^2 + y^2 \le 4$ (where $z \ge 0$). The upward normal satisfies

$$\mathbf n\,dS = \langle -g_x,\ -g_y,\ 1\rangle\,dA = \langle 2x,\ 2y,\ 1\rangle\,dA$$

Its $\mathbf k$ component is $+1$, so this is the upward side. Put $z = 4 - x^2 - y^2$ into $\mathbf F$:

$$\mathbf F\cdot\mathbf n\,dS = \big(2x^2 + 2y^2 + 4 - x^2 - y^2\big)\,dA = \big(x^2 + y^2 + 4\big)\,dA$$

$$\text{Flux} = \int_0^{2\pi}\!\!\int_0^2 (r^2 + 4)\,r\,dr\,d\theta = 2\pi\Big[\frac{r^4}{4} + 2r^2\Big]_0^2 = 2\pi(4 + 8)$$

$$\boxed{\text{Flux} = 24\pi \approx 75.40 \quad\text{(upward)}}$$

Positive flux is what you expect: $\mathbf F$ points away from the origin, and the upward side of the
cap faces away from the origin. Reversing the orientation to downward would give $-24\pi$.`,
      },
      {
        id: 'mth425-lab11-p6',
        label: 'P6',
        method: String.raw`flux through a closed surface, parametric`,
        statement: String.raw`Let $S$ be the sphere $x^2 + y^2 + z^2 = 4$, oriented **outward**. Find the flux of
$\mathbf F = \langle x,\ y,\ z^2\rangle$ through $S$.`,
        solution: String.raw`Orientation: outward, away from the origin. Parametrize with the spherical angles
($\varphi$ measured from the positive $z$-axis):

$$\mathbf r(\varphi,\theta) = \langle 2\sin\varphi\cos\theta,\ 2\sin\varphi\sin\theta,\ 2\cos\varphi\rangle,
\qquad 0 \le \varphi \le \pi,\ \ 0 \le \theta \le 2\pi$$

$$\mathbf r_\varphi = \langle 2\cos\varphi\cos\theta,\ 2\cos\varphi\sin\theta,\ -2\sin\varphi\rangle, \qquad
\mathbf r_\theta = \langle -2\sin\varphi\sin\theta,\ 2\sin\varphi\cos\theta,\ 0\rangle$$

$$\mathbf r_\varphi\times\mathbf r_\theta = 4\sin\varphi\,\langle\sin\varphi\cos\theta,\ \sin\varphi\sin\theta,\ \cos\varphi\rangle$$

Direction check: this is a positive multiple of $\mathbf r$ itself for $0 < \varphi < \pi$, so it points
outward and no sign flip is needed. On $S$, $\mathbf F = \langle 2\sin\varphi\cos\theta,\ 2\sin\varphi\sin\theta,\ 4\cos^2\varphi\rangle$, so

$$\mathbf F\cdot(\mathbf r_\varphi\times\mathbf r_\theta) = 4\sin\varphi\Big[2\sin^2\varphi\cos^2\theta + 2\sin^2\varphi\sin^2\theta + 4\cos^3\varphi\Big]
= 8\sin^3\varphi + 16\sin\varphi\cos^3\varphi$$

$$\text{Flux} = \int_0^{2\pi}\!\!\int_0^{\pi}\big(8\sin^3\varphi + 16\sin\varphi\cos^3\varphi\big)\,d\varphi\,d\theta$$

With $\int_0^\pi\sin^3\varphi\,d\varphi = \tfrac{4}{3}$ and $\int_0^\pi\sin\varphi\cos^3\varphi\,d\varphi
= \Big[-\tfrac{\cos^4\varphi}{4}\Big]_0^\pi = 0$:

$$\text{Flux} = 2\pi\Big(8\cdot\frac{4}{3} + 0\Big)$$

$$\boxed{\text{Flux} = \frac{64\pi}{3} \approx 67.02 \quad\text{(outward)}}$$

The $z^2$ component contributes nothing: $F_z n_z = z^2\cdot z/2$ is odd in $z$, so the upper and
lower halves of the sphere cancel. All of the flux comes from the $\langle x, y\rangle$ part.`,
      },
      {
        id: 'mth425-lab11-p7',
        label: 'P7',
        method: String.raw`both sides of Stokes' theorem`,
        statement: String.raw`Let $\mathbf F = \langle y^2 + z,\ x,\ z^2\rangle$ and let $S$ be the part of the paraboloid
$z = 4 - x^2 - y^2$ with $z \ge 0$, oriented upward. Let $C$ be its boundary. Verify Stokes' theorem
by computing both $\iint_S(\nabla\times\mathbf F)\cdot\mathbf n\,dS$ and $\oint_C\mathbf F\cdot d\mathbf r$.`,
        solution: String.raw`**Hypotheses.** $S$ is a smooth surface (a graph of a polynomial), oriented upward. Its boundary is
the circle $C$: $x^2 + y^2 = 4$, $z = 0$, a simple closed smooth curve. $\mathbf F$ is polynomial,
so it has continuous first partials on all of $\mathbb R^3$. Stokes' theorem applies.

**Orientation of $C$.** Upward $\mathbf n$ and the right-hand rule give counterclockwise travel on
$C$ seen from above:
$\mathbf r(t) = \langle 2\cos t,\ 2\sin t,\ 0\rangle$, $0 \le t \le 2\pi$.

**Surface side.** With $P = y^2 + z$, $Q = x$, $R = z^2$:

$$\nabla\times\mathbf F = \langle R_y - Q_z,\ P_z - R_x,\ Q_x - P_y\rangle = \langle 0,\ 1,\ 1 - 2y\rangle$$

For the graph $g = 4 - x^2 - y^2$, the upward $\mathbf n\,dS = \langle 2x,\ 2y,\ 1\rangle\,dA$, so

$$(\nabla\times\mathbf F)\cdot\mathbf n\,dS = \big(0 + 2y + 1 - 2y\big)\,dA = dA$$

$$\iint_S(\nabla\times\mathbf F)\cdot\mathbf n\,dS = \iint_{x^2+y^2\le 4} 1\,dA = 4\pi$$

**Line side.** On $C$, $z = 0$ and $dz = 0$, so $\mathbf F\cdot d\mathbf r = y^2\,dx + x\,dy$. With
$x = 2\cos t$, $y = 2\sin t$, $dx = -2\sin t\,dt$, $dy = 2\cos t\,dt$:

$$\oint_C \mathbf F\cdot d\mathbf r = \int_0^{2\pi}\Big[-8\sin^3 t + 4\cos^2 t\Big]\,dt = 0 + 4\pi$$

since $\int_0^{2\pi}\sin^3 t\,dt = 0$ and $\int_0^{2\pi}\cos^2 t\,dt = \pi$.

$$\boxed{\iint_S(\nabla\times\mathbf F)\cdot\mathbf n\,dS = 4\pi = \oint_C\mathbf F\cdot d\mathbf r}$$

Both sides agree. Had $C$ been traversed clockwise, the line integral would have come out as $-4\pi$,
which is how a wrong orientation shows up.`,
      },
      {
        id: 'mth425-lab11-p8',
        label: 'P8',
        method: String.raw`swap the curved surface for a disk`,
        statement: String.raw`Let $\mathbf F = \langle -yz,\ xz,\ xy\rangle$ and let $S$ be the cap of the sphere
$x^2 + y^2 + z^2 = 25$ with $z \ge 3$, oriented outward (away from the origin). Find
$\displaystyle\iint_S(\nabla\times\mathbf F)\cdot\mathbf n\,dS$, using Stokes' theorem to replace $S$
by a flat surface.`,
        solution: String.raw`**Boundary.** The sphere meets the plane $z = 3$ where $x^2 + y^2 = 16$. So $C$ is the circle of radius 4
centered on the $z$-axis at height $z = 3$. The outward normal on the cap has a positive $\mathbf k$
component, so by the right-hand rule $C$ runs counterclockwise seen from above.

**Hypotheses.** $\mathbf F$ is polynomial, so it is $C^1$ on all of $\mathbb R^3$. The cap is smooth and
$C$ is a simple closed smooth curve. Stokes' theorem applies to $S$, and equally to the flat disk $D$ in
the plane $z = 3$ bounded by the same circle $C$, oriented upward so that $C$ keeps the same direction.
Since $\nabla\times\mathbf F$ is continuous on the solid region between $S$ and $D$ as well, the two
surface integrals are equal to the same line integral.

**Curl.** With $P = -yz$, $Q = xz$, $R = xy$:

$$\nabla\times\mathbf F = \langle R_y - Q_z,\ P_z - R_x,\ Q_x - P_y\rangle = \langle x - x,\ -y - y,\ z + z\rangle = \langle 0,\ -2y,\ 2z\rangle$$

**Swap to the disk.** On $D$, $\mathbf n = \mathbf k$ and $dS = dA$, so only the $\mathbf k$ component
of the curl matters, and $z = 3$ there:

$$(\nabla\times\mathbf F)\cdot\mathbf n = 2z = 6$$

$$\iint_D 6\,dA = 6\cdot\pi\cdot 4^2 = 96\pi$$

$$\boxed{\iint_S(\nabla\times\mathbf F)\cdot\mathbf n\,dS = \oint_C\mathbf F\cdot d\mathbf r = \iint_D(\nabla\times\mathbf F)\cdot\mathbf k\,dA = 96\pi \approx 301.6}$$

**Check on the line integral.** On $C$, $\mathbf r = \langle 4\cos t,\ 4\sin t,\ 3\rangle$, and
$\mathbf F\cdot d\mathbf r = z\,(x\,dy - y\,dx) = 3\cdot 16\,dt$, so $\oint_C\mathbf F\cdot d\mathbf r = 48\cdot 2\pi = 96\pi$.

Doing it directly on the cap is possible, with $\mathbf n = \tfrac{1}{5}\langle x, y, z\rangle$ and
$(\nabla\times\mathbf F)\cdot\mathbf n = \tfrac{2}{5}(z^2 - y^2)$ integrated over spherical angles, but it
takes far longer and returns the same $96\pi$. The flat disk replaces a trigonometric integral over a
curved cap with one line of arithmetic.`,
      },
    ],
  },
  {
    id: 'mth425-lab12',
    number: 12,
    title: 'Triple integrals and the divergence theorem',
    ref: 'Zill §9.15, 9.16',
    blurb: 'Quiz prep. Closed book, about 10 minutes per problem. Problems 1 and 2 are rectangular coordinates (planes, then surfaces), problem 3 is cylindrical, problem 4 is spherical, and problem 5 is about choosing the system. Problems 6 to 8 are the divergence theorem: verify both sides, close an open surface with a cap, and check the hypotheses. No figures are given, so sketch each solid before you set limits. State the coordinate system and the limits before you integrate. Every answer was recomputed by a different route.',
    intro: String.raw`**Cylindrical.** $x = r\cos\theta,\ y = r\sin\theta,\ z = z$, with $dV = r\,dz\,dr\,d\theta$ and
$x^2 + y^2 = r^2$. Use it when the solid has an axis of symmetry along $z$: cylinders, paraboloids
$z = x^2 + y^2$, discs as shadows.

**Spherical.** $x = \rho\sin\phi\cos\theta,\ y = \rho\sin\phi\sin\theta,\ z = \rho\cos\phi$, with
$\rho \ge 0$, $0 \le \phi \le \pi$, and $dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$ and
$x^2 + y^2 + z^2 = \rho^2$. Use it for spheres, cones $z = c\sqrt{x^2 + y^2}$ (which is $\phi$ = constant)
and anything that is a function of $x^2 + y^2 + z^2$.

**Setting limits.** Innermost variable first: its limits may use the other two. Each later limit may
use only variables still to come. The outermost limits are constants.

**Divergence theorem.** For a solid $D$ bounded by a closed, piecewise smooth surface $S$ with outward
unit normal $\mathbf n$, and $\mathbf F$ with continuous first partials on an open region containing $D$:

$$\iint_S \mathbf F\cdot\mathbf n\,dS = \iiint_D \nabla\cdot\mathbf F\,dV, \qquad
\nabla\cdot\mathbf F = \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z}$$

Check all four hypotheses first: closed, piecewise smooth, outward orientation, $\mathbf F$ is $C^1$
everywhere inside $D$ (including its interior points).`,
    pdf: 'practice/mth425/set12.pdf',
    problems: [
      {
        id: 'mth425-lab12-p1',
        label: 'P1',
        method: String.raw`rectangular coordinates, solid bounded by planes`,
        statement: String.raw`A solid tetrahedron $D$ is bounded by the three coordinate planes and the plane $x + 2y + z = 4$.
Its density is $\delta(x, y, z) = y$ kg/m$^3$. Set up the limits in the order $dz\,dy\,dx$, then find
(a) the volume of $D$ and (b) its mass.`,
        solution: String.raw`**Coordinates and limits.** Rectangular. The plane meets the axes at $(4, 0, 0)$, $(0, 2, 0)$ and
$(0, 0, 4)$, so $D$ is the tetrahedron with those three vertices and the origin. For $dz\,dy\,dx$,
$z$ runs from the floor $z = 0$ up to the plane, $z = 4 - x - 2y$. The shadow in the $xy$-plane
(set $z = 0$) is the triangle $x \ge 0$, $y \ge 0$, $x + 2y \le 4$, so

$$0 \le x \le 4, \qquad 0 \le y \le \frac{4 - x}{2}, \qquad 0 \le z \le 4 - x - 2y$$

Write $u = 4 - x$ to keep the algebra short, so the upper limit for $y$ is $u/2$ and for $z$ it is
$u - 2y$.

**(a) Volume.**

$$V = \int_0^4\int_0^{u/2}\int_0^{u - 2y} dz\,dy\,dx = \int_0^4\int_0^{u/2}(u - 2y)\,dy\,dx
= \int_0^4\Big(\frac{u^2}{2} - \frac{u^2}{4}\Big)dx = \int_0^4\frac{(4 - x)^2}{4}\,dx
= \frac{64}{12} = \frac{16}{3}\ \text{m}^3$$

This agrees with $\tfrac{1}{6}abc = \tfrac{1}{6}(4)(2)(4)$, the volume of a tetrahedron with
perpendicular edges $a, b, c$.

**(b) Mass.**

$$m = \int_0^4\int_0^{u/2}\int_0^{u - 2y} y\,dz\,dy\,dx = \int_0^4\int_0^{u/2} y(u - 2y)\,dy\,dx
= \int_0^4\Big[\frac{uy^2}{2} - \frac{2y^3}{3}\Big]_0^{u/2}dx$$

At $y = u/2$ the bracket is $\dfrac{u^3}{8} - \dfrac{u^3}{12} = \dfrac{u^3}{24}$, so

$$m = \int_0^4\frac{(4 - x)^3}{24}\,dx = \frac{1}{24}\cdot\frac{4^4}{4} = \frac{8}{3}\ \text{kg}$$

$$\boxed{V = \tfrac{16}{3}\ \text{m}^3, \qquad m = \tfrac{8}{3}\ \text{kg}}$$`,
      },
      {
        id: 'mth425-lab12-p2',
        label: 'P2',
        method: String.raw`rectangular coordinates, solid bounded by surfaces`,
        statement: String.raw`Find the volume of the solid bounded by the parabolic cylinder $y = x^2$, the plane $y + z = 4$ and
the plane $z = 0$. Give the limits in the order $dz\,dy\,dx$, then redo the setup in the order
$dz\,dx\,dy$ and confirm the value.`,
        solution: String.raw`**Coordinates and limits.** Rectangular. The solid sits over the region of the $xy$-plane trapped
between the parabola $y = x^2$ and the line $y = 4$ (the plane $y + z = 4$ has $z = 0$ there). The
parabola meets $y = 4$ at $x = \pm 2$. Height: from $z = 0$ up to $z = 4 - y$.

Order $dz\,dy\,dx$:

$$-2 \le x \le 2, \qquad x^2 \le y \le 4, \qquad 0 \le z \le 4 - y$$

$$V = \int_{-2}^{2}\int_{x^2}^{4}(4 - y)\,dy\,dx = \int_{-2}^{2}\frac{(4 - x^2)^2}{2}\,dx
= \frac{1}{2}\int_{-2}^{2}\big(16 - 8x^2 + x^4\big)dx$$

$$= \frac{1}{2}\Big[16x - \frac{8x^3}{3} + \frac{x^5}{5}\Big]_{-2}^{2}
= \frac{1}{2}\Big(64 - \frac{128}{3} + \frac{64}{5}\Big) = \frac{256}{15}$$

**Other order, $dz\,dx\,dy$.** Now $y$ is outermost and runs over its full range, $0 \le y \le 4$.
For a fixed $y$, $x$ runs across the parabola: $-\sqrt{y} \le x \le \sqrt{y}$. Then $0 \le z \le 4 - y$.

$$V = \int_0^4\int_{-\sqrt{y}}^{\sqrt{y}}(4 - y)\,dx\,dy = \int_0^4 2\sqrt{y}\,(4 - y)\,dy
= \int_0^4\big(8y^{1/2} - 2y^{3/2}\big)dy = \Big[\frac{16}{3}y^{3/2} - \frac{4}{5}y^{5/2}\Big]_0^4
= \frac{128}{3} - \frac{128}{5} = \frac{256}{15}$$

$$\boxed{V = \tfrac{256}{15}\ \text{units}^3 \approx 17.07}$$`,
      },
      {
        id: 'mth425-lab12-p3',
        label: 'P3',
        method: String.raw`cylindrical coordinates, paraboloids`,
        statement: String.raw`The solid $D$ lies between the paraboloids $z = x^2 + y^2$ (below) and $z = 8 - x^2 - y^2$ (above).
Find (a) its volume and (b) its mass if the density is $\delta = z$.`,
        solution: String.raw`**Coordinates and limits.** Cylindrical, because both surfaces are functions of $r^2 = x^2 + y^2$.
The paraboloids meet where $r^2 = 8 - r^2$, so $r = 2$ (and $z = 4$). The shadow in the $xy$-plane is
the disc $r \le 2$. For $r$ in that disc the lower surface is $z = r^2$ and the upper is $z = 8 - r^2$:

$$0 \le \theta \le 2\pi, \qquad 0 \le r \le 2, \qquad r^2 \le z \le 8 - r^2, \qquad dV = r\,dz\,dr\,d\theta$$

**(a) Volume.**

$$V = \int_0^{2\pi}\int_0^2\int_{r^2}^{8 - r^2} r\,dz\,dr\,d\theta
= 2\pi\int_0^2 r\,(8 - 2r^2)\,dr = 2\pi\Big[4r^2 - \frac{r^4}{2}\Big]_0^2 = 2\pi(16 - 8) = 16\pi$$

**(b) Mass.** Integrate $z\,r$ over the same limits.

$$m = \int_0^{2\pi}\int_0^2\int_{r^2}^{8 - r^2} z\,r\,dz\,dr\,d\theta
= 2\pi\int_0^2 r\cdot\frac{(8 - r^2)^2 - r^4}{2}\,dr$$

The numerator is $(8 - r^2)^2 - r^4 = 64 - 16r^2$, so

$$m = 2\pi\int_0^2 r\,(32 - 8r^2)\,dr = 2\pi\Big[16r^2 - 2r^4\Big]_0^2 = 2\pi(64 - 32) = 64\pi$$

$$\boxed{V = 16\pi, \qquad m = 64\pi}$$`,
      },
      {
        id: 'mth425-lab12-p4',
        label: 'P4',
        method: String.raw`spherical coordinates, sphere not centred at the origin`,
        statement: String.raw`Let $D$ be the ball $x^2 + y^2 + z^2 \le 4z$. Find (a) its volume and (b) $\iiint_D z\,dV$, then
use them to get the height of its centroid.`,
        solution: String.raw`**Coordinates and limits.** Spherical. Convert the boundary: $\rho^2 = 4\rho\cos\phi$, so
$\rho = 4\cos\phi$. (Completing the square gives $x^2 + y^2 + (z - 2)^2 = 4$, a ball of radius 2
centred at $(0, 0, 2)$, which touches the origin.) The ball lies in $z \ge 0$, so $\phi$ only reaches
$\pi/2$ and $\cos\phi \ge 0$:

$$0 \le \theta \le 2\pi, \qquad 0 \le \phi \le \frac{\pi}{2}, \qquad 0 \le \rho \le 4\cos\phi, \qquad
dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$$

**(a) Volume.**

$$V = \int_0^{2\pi}\int_0^{\pi/2}\int_0^{4\cos\phi}\rho^2\sin\phi\,d\rho\,d\phi\,d\theta
= 2\pi\int_0^{\pi/2}\frac{64\cos^3\phi}{3}\sin\phi\,d\phi = 2\pi\cdot\frac{64}{3}\cdot\frac{1}{4}
= \frac{32\pi}{3}$$

This matches $\tfrac{4}{3}\pi(2)^3$.

**(b) The integral of $z$.** With $z = \rho\cos\phi$ the integrand is $\rho^3\cos\phi\sin\phi$:

$$\iiint_D z\,dV = 2\pi\int_0^{\pi/2}\cos\phi\sin\phi\,\frac{(4\cos\phi)^4}{4}\,d\phi
= 2\pi\cdot 64\int_0^{\pi/2}\cos^5\phi\sin\phi\,d\phi = 2\pi\cdot 64\cdot\frac{1}{6} = \frac{64\pi}{3}$$

**Centroid height.** $\bar z = \dfrac{64\pi/3}{32\pi/3} = 2$, the centre of the ball, as symmetry says.

$$\boxed{V = \tfrac{32\pi}{3}, \qquad \iiint_D z\,dV = \tfrac{64\pi}{3}, \qquad \bar z = 2}$$`,
      },
      {
        id: 'mth425-lab12-p5',
        label: 'P5',
        method: String.raw`reading the region, then choosing the system`,
        statement: String.raw`Evaluate

$$\int_{-2}^{2}\int_{-\sqrt{4 - x^2}}^{\sqrt{4 - x^2}}\int_{\sqrt{x^2 + y^2}}^{\sqrt{8 - x^2 - y^2}} z\,dz\,dy\,dx$$

Describe the solid in words, choose a coordinate system and say why, then confirm with the other
curvilinear system.`,
        solution: String.raw`**The solid.** In $z$ the region runs from the cone $z = \sqrt{x^2 + y^2}$ up to the sphere
$x^2 + y^2 + z^2 = 8$ (upper half, radius $2\sqrt{2}$). The cone and sphere meet where
$r^2 + r^2 = 8$, so $r = 2$, matching the shadow disc $x^2 + y^2 \le 4$ in the outer two limits. So $D$
is an ice-cream cone: the part of the ball of radius $2\sqrt{2}$ lying above the $45^{\circ}$ cone.

**Choice.** Spherical is better: the cone is $\phi = \pi/4$ (since $z = r$ means $\tan\phi = 1$) and the
sphere is $\rho = 2\sqrt{2}$, so every limit is a constant. In Cartesian form the integral is nearly
impossible to do by hand.

**Spherical.**

$$0 \le \theta \le 2\pi, \qquad 0 \le \phi \le \frac{\pi}{4}, \qquad 0 \le \rho \le 2\sqrt{2}$$

$$\iiint_D z\,dV = \int_0^{2\pi}\int_0^{\pi/4}\int_0^{2\sqrt{2}}\rho\cos\phi\;\rho^2\sin\phi\,d\rho\,d\phi\,d\theta$$

The integral separates into three single integrals:

$$= 2\pi\cdot\Big[\frac{\rho^4}{4}\Big]_0^{2\sqrt{2}}\cdot\Big[\frac{\sin^2\phi}{2}\Big]_0^{\pi/4}
= 2\pi\cdot 16\cdot\frac{1}{4} = 8\pi$$

**Cylindrical, as a check.** $0 \le \theta \le 2\pi$, $0 \le r \le 2$, $r \le z \le \sqrt{8 - r^2}$:

$$2\pi\int_0^2 r\cdot\frac{(8 - r^2) - r^2}{2}\,dr = 2\pi\int_0^2\big(4r - r^3\big)dr
= 2\pi(8 - 4) = 8\pi$$

$$\boxed{\iiint_D z\,dV = 8\pi}$$

Cylindrical works too, because the cone becomes $z = r$, but its upper limit $\sqrt{8 - r^2}$ is
messier than the constant $2\sqrt{2}$.`,
      },
      {
        id: 'mth425-lab12-p6',
        label: 'P6',
        method: String.raw`verifying both sides`,
        statement: String.raw`Let $\mathbf F = \langle x^3,\ y^3,\ z^2\rangle$ and let $S$ be the closed surface made of the cylinder
$x^2 + y^2 = 4$ for $0 \le z \le 3$, together with the discs $z = 0$ and $z = 3$ that cap it.
Verify the divergence theorem by computing both sides, with $S$ oriented outward.`,
        solution: String.raw`**Hypotheses.** $S$ is closed (the two discs seal the cylinder), piecewise smooth (three smooth
pieces), and given the outward orientation. $\mathbf F$ is polynomial, so it is $C^1$ everywhere. The
theorem applies.

**Volume side.** $\nabla\cdot\mathbf F = 3x^2 + 3y^2 + 2z$. Cylindrical coordinates, since $D$ is a
solid cylinder about the $z$-axis:

$$0 \le \theta \le 2\pi, \qquad 0 \le r \le 2, \qquad 0 \le z \le 3, \qquad
\nabla\cdot\mathbf F = 3r^2 + 2z$$

$$\iiint_D\nabla\cdot\mathbf F\,dV = \int_0^{2\pi}\int_0^2\int_0^3\big(3r^2 + 2z\big)\,r\,dz\,dr\,d\theta
= 2\pi\int_0^2\big(9r^3 + 9r\big)\,dr = 2\pi(36 + 18) = 108\pi$$

**Surface side.** Three pieces, each with its outward normal.

*Lateral surface.* $\mathbf n = \langle x, y, 0\rangle/2$. On it $x = 2\cos\theta$, $y = 2\sin\theta$,
and $dS = 2\,d\theta\,dz$ (arc length is $r\,d\theta = 2\,d\theta$):

$$\mathbf F\cdot\mathbf n = \frac{x^4 + y^4}{2} = 8\big(\cos^4\theta + \sin^4\theta\big)$$

$$\iint_{\text{lat}} = \int_0^3\int_0^{2\pi}16\big(\cos^4\theta + \sin^4\theta\big)\,d\theta\,dz
= 3\cdot 16\cdot\Big(\frac{3\pi}{4} + \frac{3\pi}{4}\Big) = 72\pi$$

using $\int_0^{2\pi}\cos^4\theta\,d\theta = \int_0^{2\pi}\sin^4\theta\,d\theta = \tfrac{3\pi}{4}$.

*Top disc, $z = 3$.* $\mathbf n = \mathbf k$, $\mathbf F\cdot\mathbf n = z^2 = 9$, area $4\pi$:
flux $= 36\pi$.

*Bottom disc, $z = 0$.* $\mathbf n = -\mathbf k$, $\mathbf F\cdot\mathbf n = -z^2 = 0$: flux $= 0$.

$$72\pi + 36\pi + 0 = 108\pi$$

Both sides agree.

$$\boxed{\iint_S \mathbf F\cdot\mathbf n\,dS = \iiint_D\nabla\cdot\mathbf F\,dV = 108\pi}$$`,
      },
      {
        id: 'mth425-lab12-p7',
        label: 'P7',
        method: String.raw`closing an open surface`,
        statement: String.raw`Let $\mathbf F = \langle xz,\ yz,\ z^2 + 1\rangle$ and let $S$ be the paraboloid $z = 4 - x^2 - y^2$ with
$z \ge 0$, oriented upward (away from the $z$-axis, outward from the solid under it). Find
$\iint_S\mathbf F\cdot\mathbf n\,dS$ by closing $S$ with a cap, applying the divergence theorem to the closed surface, and
subtracting the flux through the cap.`,
        solution: String.raw`**Why it needs a cap.** $S$ is a bowl turned upside down with nothing across the bottom, so it is not
closed and the theorem does not apply to it directly. Add the disc $C$: $z = 0$, $x^2 + y^2 \le 4$. Then
$S \cup C$ is closed, piecewise smooth, outward-oriented (upward on $S$, downward on $C$), and $\mathbf F$
is polynomial, hence $C^1$. All hypotheses hold for the solid $D$ under the paraboloid, and

$$\iint_S + \iint_C = \iiint_D\nabla\cdot\mathbf F\,dV
\qquad\text{so}\qquad \iint_S = \iiint_D\nabla\cdot\mathbf F\,dV - \iint_C$$

**Volume side.** $\nabla\cdot\mathbf F = z + z + 2z = 4z$. Cylindrical coordinates, since $D$ is
bounded by a paraboloid about the $z$-axis and a disc:

$$0 \le \theta \le 2\pi, \qquad 0 \le r \le 2, \qquad 0 \le z \le 4 - r^2$$

$$\iiint_D 4z\,dV = 2\pi\int_0^2 r\,\big[2z^2\big]_0^{4 - r^2}\,dr = 4\pi\int_0^2(4 - r^2)^2\,r\,dr$$

Put $u = 4 - r^2$, so $r\,dr = -\tfrac{1}{2}du$, and $u$ runs from 4 down to 0:

$$= 4\pi\cdot\frac{1}{2}\int_0^4u^2\,du = 2\pi\cdot\frac{64}{3} = \frac{128\pi}{3}$$

**Cap flux.** On $C$, $\mathbf n = -\mathbf k$ and $z = 0$, so
$\mathbf F\cdot\mathbf n = -(z^2 + 1) = -1$. The disc has area $4\pi$, so
$\iint_C = -4\pi$.

**Subtract.**

$$\iint_S\mathbf F\cdot\mathbf n\,dS = \frac{128\pi}{3} - (-4\pi) = \frac{140\pi}{3}$$

**Check by direct computation.** For $z = g(x, y) = 4 - x^2 - y^2$, the upward normal has
$\mathbf n\,dS = \langle -g_x, -g_y, 1\rangle\,dA = \langle 2x, 2y, 1\rangle\,dA$. Then
$\mathbf F\cdot\mathbf n\,dS = \big(2x^2z + 2y^2z + z^2 + 1\big)dA = \big(2r^2(4 - r^2) + (4 - r^2)^2 + 1\big)dA
= (17 - r^4)\,dA$, and

$$2\pi\int_0^2(17 - r^4)\,r\,dr = 2\pi\Big(34 - \frac{32}{3}\Big) = \frac{140\pi}{3}$$

$$\boxed{\iint_S\mathbf F\cdot\mathbf n\,dS = \tfrac{140\pi}{3}}$$`,
      },
      {
        id: 'mth425-lab12-p8',
        label: 'P8',
        method: String.raw`checking hypotheses`,
        statement: String.raw`Let $\mathbf F = \dfrac{\langle x, y, z\rangle}{(x^2 + y^2 + z^2)^{3/2}}$. (a) Show $\nabla\cdot\mathbf F = 0$
wherever $\mathbf F$ is defined. (b) A student applies the divergence theorem to the sphere
$x^2 + y^2 + z^2 = 4$ and concludes the outward flux is 0. Check the hypotheses, and compute the flux
directly. (c) Does the theorem apply to the closed surface bounding the cube $1 \le x, y, z \le 2$?
What does it give?`,
        solution: String.raw`**(a) Divergence.** Write $\rho^2 = x^2 + y^2 + z^2$, so $\mathbf F = \langle x, y, z\rangle\rho^{-3}$ and
$\partial\rho/\partial x = x/\rho$. Then

$$\frac{\partial}{\partial x}\big(x\rho^{-3}\big) = \rho^{-3} - 3x\rho^{-4}\cdot\frac{x}{\rho} = \rho^{-3} - \frac{3x^2}{\rho^5}$$

The $y$ and $z$ terms are the same with $y^2$, $z^2$. Add them:

$$\nabla\cdot\mathbf F = \frac{3}{\rho^3} - \frac{3(x^2 + y^2 + z^2)}{\rho^5} = \frac{3}{\rho^3} - \frac{3}{\rho^3} = 0
\qquad(\rho \ne 0)$$

**(b) The sphere.** Hypotheses: the sphere is closed, smooth, and the orientation is outward. All fine.
The last one fails: $\mathbf F$ is not even defined at the origin, which is an interior point of the
ball, so $\mathbf F$ is not $C^1$ on the solid. The theorem does not apply, and the student's $0$ comes
from integrating $\nabla\cdot\mathbf F = 0$ over a region where the divergence does not exist at one
point. Compute the flux directly instead. On the sphere $\rho = 2$, $\mathbf n = \langle x, y, z\rangle/\rho$ and

$$\mathbf F\cdot\mathbf n = \frac{x^2 + y^2 + z^2}{\rho^3\cdot\rho} = \frac{1}{\rho^2} = \frac{1}{4}$$

The area of the sphere is $4\pi(2)^2 = 16\pi$, so

$$\iint_S\mathbf F\cdot\mathbf n\,dS = \frac{1}{4}\cdot 16\pi = 4\pi \ne 0$$

The same value $4\pi$ comes out for a sphere of any radius $R$, since $\mathbf F\cdot\mathbf n = 1/R^2$
and the area is $4\pi R^2$.

**(c) The cube.** The solid $1 \le x, y, z \le 2$ does not contain the origin, so $\mathbf F$ is $C^1$ on an
open region around it. The boundary is closed (six square faces), piecewise smooth, and can be oriented
outward. All hypotheses hold, and

$$\iint_{\partial\text{cube}}\mathbf F\cdot\mathbf n\,dS = \iiint_{\text{cube}}0\,dV = 0$$

Here the incoming flux through the three faces nearest the origin cancels the outgoing flux through the
other three. The sphere in (b) and the cube in (c) differ in exactly one respect, whether the singular
point lies inside.

$$\boxed{\nabla\cdot\mathbf F = 0;\quad \text{sphere: theorem does not apply, flux} = 4\pi;\quad
\text{cube: theorem applies, flux} = 0}$$`,
      },
    ],
  },
]
