import type { PracticeLab } from '@/types'

/* Generated from the MTH425 midterm practice booklets in the Aerospace Semester 3 repo (LaTeX converted to
   Markdown with $…$ / $$…$$ KaTeX math, rendered by renderMarkdown in src/lib/markdown.ts).
   Figures are the booklets' TikZ drawings, exported to SVG under public/practice/. */

export const MTH425_PRACTICE_MIDTERM: PracticeLab =
  {
    id: 'mth425-practice-midterm',
    number: 7.5,
    heading: 'Practice midterm',
    short: 'M',
    title: "First-order, higher-order and Laplace: the gaps",
    ref: 'Zill §2.2–4.3',
    blurb: String.raw`Eight questions, 80 marks, on the midterm topics that past papers skipped. Longer than a real midterm: allow about two hours, or split it into Questions 1–4 and 5–8. No calculator. Every final answer was checked by substitution.`,
    intro: String.raw`| Q | Topic | Zill |
|---|---|---|
| 1 | Separable (implicit and singular solutions); linear IVP and its interval | 2.2, 2.3 |
| 2 | Non-exact equation made exact by an integrating factor; $y' = f(Ax + By + C)$ | 2.4, 2.5 |
| 3 | Superposition, Wronskian, fundamental set, existence and uniqueness, BVP | 3.1 |
| 4 | Reduction of order with variable coefficients | 3.2 |
| 5 | Third-order auxiliary equation by factoring; undetermined coefficients with trig forcing | 3.3, 3.4 |
| 6 | Cauchy-Euler (complex and repeated roots); variation of parameters after putting the equation in standard form | 3.5, 3.6 |
| 7 | Laplace transform from the definition; unit-step form; first translation | 4.1–4.3 |
| 8 | Single ODE solved by Laplace; IVP with a piecewise (unit-step) forcing | 4.2, 4.3 |

**Not covered here** because the past papers already test them well: Bernoulli, variation of parameters with $y_1$, $y_2$ given, the form of $y_p$, inverse transforms and Laplace systems. The earlier practice sets drill those.`,
    pdf: 'practice/mth425/practice-midterm.pdf',
    problems: [
      {
        id: 'mth425-pm-q1',
        label: 'Q1',
        method: '',
        statement: String.raw`*[10 marks]* **(a)** Find the general solution, and any singular solution, of

$$\frac{dy}{dx} = \frac{xy + 3x - y - 3}{xy - 2x + 4y - 8} .$$

**(b)** Solve the initial-value problem and give the largest interval $I$ on
which the solution is defined:

$$x\frac{dy}{dx} - 4y = x^6 e^{x}, \qquad y(1) = 1 .$$`,
        solution: String.raw`**(a) Classify.** The right side looks hopeless until you factor numerator
and denominator by grouping:

$$xy + 3x - y - 3 = (x-1)(y+3), \qquad xy - 2x + 4y - 8 = (x+4)(y-2) .$$

So $\dfrac{dy}{dx} = \dfrac{x-1}{x+4}\cdot\dfrac{y+3}{y-2}$, which is
separable.

**Singular solution.** $y = -3$ makes the right side zero, so the constant
function $y = -3$ is a solution. Dividing by $y + 3$ below loses it.

**Separate and integrate.** For $y \neq -3$,

$$\frac{y-2}{y+3}\,dy = \frac{x-1}{x+4}\,dx \quad\Rightarrow\quad \int\left(1 - \frac{5}{y+3}\right)dy = \int\left(1 - \frac{5}{x+4}\right)dx ,$$

using long division ($y - 2 = (y + 3) - 5$, and the same for $x$).

**Answer.** (a) $y - 5\ln|y+3| = x - 5\ln|x+4| + c$, plus the singular
solution $y = -3$.

**Note.** Exponentiating gives $(y+3)^5 = C(x+4)^5 e^{y-x}$. In that form
$C = 0$ recovers $y = -3$, so it is only singular relative to the logarithmic
form. Either way, say it.

**(b) Classify.** Linear in $y$. Standard form, dividing by $x$:

$$\frac{dy}{dx} - \frac{4}{x}\,y = x^5 e^{x} .$$

$P(x) = -4/x$ is continuous on $(-\infty, 0)$ and $(0, \infty)$. The initial
point $x_0 = 1$ lies in $(0, \infty)$.

**Integrating factor.** $\mu = e^{\int -4/x\,dx} = e^{-4\ln x} = x^{-4}$
on $x > 0$. Then

$$\frac{d}{dx}\left(x^{-4}y\right) = x^{-4}\cdot x^5 e^{x} = xe^{x} \quad\Rightarrow\quad x^{-4}y = xe^{x} - e^{x} + c .$$

$y(1) = 1$ gives $1 = e - e + c$, so $c = 1$.

**Answer.** (b) $y = x^5 e^{x} - x^4 e^{x} + x^4$, $I = (0, \infty)$.

**Check.** $y' = (x^5 + 5x^4)e^{x} - (x^4 + 4x^3)e^{x} + 4x^3$, so
$xy' - 4y = x^6 e^{x}$ after the $x^5$, $x^4$ and $x^3$ terms cancel.

**Why not all $x$.** The formula is defined everywhere, but the condition
at $x_0 = 1$ only pins down $c$ on $(0, \infty)$. On $x < 0$ the general
solution is $x^4(xe^{x} - e^{x} + k)$ with its own constant $k$, and because
$x^4$ and its derivative vanish at 0, any $k$ joins smoothly. So the IVP
determines $y$ only on the interval containing $x_0$ where $P = -4/x$ is
continuous.`,
      },
      {
        id: 'mth425-pm-q2',
        label: 'Q2',
        method: '',
        statement: String.raw`*[10 marks]* **(a)** Show that the equation is not exact, find an integrating factor that
makes it exact, and solve the initial-value problem:

$$\left(x^2 + y^2 + x\right)dx + xy\,dy = 0, \qquad y(1) = 1 .$$

**(b)** Solve the initial-value problem by a suitable substitution, and state the
interval of validity:

$$\frac{dy}{dx} = 1 + e^{y - x + 5}, \qquad y(0) = -5 .$$`,
        solution: String.raw`**(a) Exactness test.** $M = x^2 + y^2 + x$, $N = xy$:

$$M_y = 2y, \qquad N_x = y, \qquad M_y \neq N_x ,$$

so it is not exact.

**Integrating factor.** Try a factor in $x$ alone:

$$\frac{M_y - N_x}{N} = \frac{2y - y}{xy} = \frac{1}{x} ,$$

which depends on $x$ only, so $\mu(x) = e^{\int dx/x} = x$. Multiplying
through:

$$\left(x^3 + xy^2 + x^2\right)dx + x^2y\,dy = 0, \qquad M_y = 2xy = N_x . \ \text{Exact.}$$

**Potential function.** From $f_y = x^2y$: $f = \tfrac12 x^2y^2 + g(x)$.
Then $f_x = xy^2 + g'(x) = x^3 + xy^2 + x^2$, so $g' = x^3 + x^2$ and
$g = \tfrac14 x^4 + \tfrac13 x^3$.

$$\tfrac14 x^4 + \tfrac12 x^2y^2 + \tfrac13 x^3 = c .$$

At $(1, 1)$: $c = \tfrac14 + \tfrac12 + \tfrac13 = \tfrac{13}{12}$.
Multiplying by 12:

**Answer.** (a) $3x^4 + 6x^2y^2 + 4x^3 = 13$

**(b) Classify.** Not separable, linear, exact or Bernoulli as written,
but the exponent contains $y - x + 5$, so substitute $u = y - x + 5$. Then
$u' = y' - 1$ and the equation becomes

$$\frac{du}{dx} = e^{u} \quad\Rightarrow\quad e^{-u}\,du = dx \quad\Rightarrow\quad -e^{-u} = x + c .$$

At $x = 0$, $u = -5 - 0 + 5 = 0$, so $-1 = c$. Then $e^{-u} = 1 - x$ and
$u = -\ln(1 - x)$, which needs $1 - x > 0$.

**Answer.** (b) $y = x - 5 - \ln(1 - x)$, valid on $(-\infty, 1)$.

**Check.** $y' = 1 + \dfrac{1}{1-x}$, and
$e^{y - x + 5} = e^{-\ln(1-x)} = \dfrac{1}{1-x}$. At $x = 0$: $y = -5$.`,
      },
      {
        id: 'mth425-pm-q3',
        label: 'Q3',
        method: '',
        statement: String.raw`*[10 marks]* **(a)** Verify that $y_1 = x$ and $y_2 = e^{x}$ are solutions of

$$(1 - x)y'' + xy' - y = 0 .$$

Show that they form a fundamental set of solutions on any interval that
doesn't contain $x = 1$, and write the general solution.

**(b)** Solve the IVP $y(0) = 1$, $y'(0) = 0$ for this equation. On what
largest interval does the existence-uniqueness theorem guarantee the
solution is the only one?

**(c)** The general solution of $y'' + 16y = 0$ is
$y = c_1\cos 4x + c_2\sin 4x$. Solve each boundary-value problem, or explain
why its solution isn't unique.

$$\text{(i)}\ y(0) = 0,\ y(\pi/2) = 0 \qquad\qquad \text{(ii)}\ y(0) = 0,\ y(\pi/8) = 0$$`,
        solution: String.raw`**(a) Verify.** For $y_1 = x$: $y_1'' = 0$, so
$(1-x)(0) + x(1) - x = 0$. For $y_2 = e^{x}$:
$(1-x)e^{x} + xe^{x} - e^{x} = 0$.

**Wronskian.**

$$W(x, e^{x}) = \begin{vmatrix} x & e^{x} \\ 1 & e^{x} \end{vmatrix} = xe^{x} - e^{x} = (x - 1)e^{x} .$$

$W \neq 0$ for every $x \neq 1$, so on any interval avoiding $x = 1$ the two
solutions are linearly independent and form a fundamental set. By
superposition every solution there is a combination of them:

**Answer.** (a) $y = c_1 x + c_2 e^{x}$ on $(-\infty, 1)$ or $(1, \infty)$.

**(b)** $y' = c_1 + c_2 e^{x}$.

$$y(0) = c_2 = 1, \qquad y'(0) = c_1 + c_2 = 0 \quad\Rightarrow\quad c_1 = -1 .$$

The theorem needs the coefficients continuous and the leading coefficient
$a_2(x) = 1 - x$ nonzero on an interval containing $x_0 = 0$. That fails only
at $x = 1$.

**Answer.** (b) $y = e^{x} - x$; unique on $(-\infty, 1)$.

**(c)** $y(0) = 0$ gives $c_1 = 0$ in both cases, so $y = c_2\sin 4x$.

**(i)** $y(\pi/2) = c_2\sin 2\pi = 0$ for every $c_2$. Infinitely many
 solutions $y = c_2\sin 4x$.

**(ii)** $y(\pi/8) = c_2\sin(\pi/2) = c_2 = 0$. Only the trivial solution
 $y = 0$.

**Answer.** (c) (i) $y = c_2\sin 4x$ for any $c_2$ (not unique);
(ii) $y = 0$ only.

**Note.** Boundary conditions don't come with a uniqueness guarantee the
way initial conditions do. Here the same equation gives either infinitely
many solutions or only the trivial one, depending on where the second
boundary sits.`,
      },
      {
        id: 'mth425-pm-q4',
        label: 'Q4',
        method: '',
        statement: String.raw`*[10 marks]* The function $y_1 = x + 1$ is a solution of

$$\left(1 - 2x - x^2\right)y'' + 2(1 + x)y' - 2y = 0 .$$

Use reduction of order to find a second solution $y_2$, and write the
general solution on an interval where $1 - 2x - x^2 \neq 0$.`,
        solution: String.raw`**Method.** Linear, second-order, homogeneous, with variable coefficients
and one known solution. That is exactly the setting for reduction of order,
$y_2 = y_1\displaystyle\int\frac{e^{-\int P\,dx}}{y_1^2}\,dx$, which needs the
equation in standard form.

**Standard form.** Divide by $1 - 2x - x^2$:

$$P(x) = \frac{2(1 + x)}{1 - 2x - x^2} .$$

**Exponential factor.** Let $w = 1 - 2x - x^2$, so $dw = -2(1 + x)\,dx$.
Then

$$-\int P\,dx = \int\frac{dw}{w} = \ln|w| \quad\Rightarrow\quad e^{-\int P\,dx} = 1 - 2x - x^2 ,$$

dropping the absolute value. A sign is a constant multiple, and constant
multiples don't matter for $y_2$.

**Second solution.** Write the numerator in terms of $x + 1$:
$1 - 2x - x^2 = 2 - (x+1)^2$.

$$\begin{aligned}y_2 &= (x+1)\int\frac{2 - (x+1)^2}{(x+1)^2}\,dx = (x+1)\int\left(\frac{2}{(x+1)^2} - 1\right)dx \\ &= (x+1)\left(-\frac{2}{x+1} - x\right) = -2 - x - x^2 .\end{aligned}$$

Dropping the overall sign, $y_2 = x^2 + x + 2$.

**Answer.** $y_2 = x^2 + x + 2$, $y = c_1(x + 1) + c_2\left(x^2 + x + 2\right)$

**Check.** With $y_2' = 2x + 1$ and $y_2'' = 2$:
$(1 - 2x - x^2)(2) + 2(1+x)(2x+1) - 2(x^2 + x + 2) = (2 - 4x - 2x^2) + (4x^2 + 6x + 2) - (2x^2 + 2x + 4) = 0$.
$y_2/y_1$ is not constant, so the pair is independent.`,
      },
      {
        id: 'mth425-pm-q5',
        label: 'Q5',
        method: '',
        statement: String.raw`*[10 marks]* **(a)** Find the general solution of

$$y''' + 3y'' - 4y = 0 .$$

**(b)** Solve the initial-value problem

$$y'' + 4y' + 4y = 25\cos x, \qquad y(0) = 0,\quad y'(0) = 0 .$$`,
        solution: String.raw`**(a)** The auxiliary equation is $m^3 + 3m^2 - 4 = 0$. Any rational root
divides 4, and $m = 1$ works: $1 + 3 - 4 = 0$. Dividing by $m - 1$:

$$m^3 + 3m^2 - 4 = (m - 1)\left(m^2 + 4m + 4\right) = (m - 1)(m + 2)^2 .$$

A simple root $m = 1$, and $m = -2$ with multiplicity 2.

**Answer.** (a) $y = c_1 e^{x} + c_2 e^{-2x} + c_3 xe^{-2x}$

**(b) Complementary solution.** $m^2 + 4m + 4 = (m + 2)^2$, so
$y_c = c_1 e^{-2x} + c_2 xe^{-2x}$.

**Trial form.** For $25\cos x$, take $y_p = A\cos x + B\sin x$. Neither
term is in $y_c$, so no change is needed.

$$y_p' = -A\sin x + B\cos x, \qquad y_p'' = -A\cos x - B\sin x .$$

Substituting and collecting:

$$(-A + 4B + 4A)\cos x + (-B - 4A + 4B)\sin x = 25\cos x .$$

$$\begin{aligned}\cos x:&\quad 3A + 4B = 25, \\ \sin x:&\quad -4A + 3B = 0 \quad\Rightarrow\quad B = \tfrac43 A .\end{aligned}$$

Then $3A + \tfrac{16}{3}A = \tfrac{25}{3}A = 25$, so $A = 3$ and $B = 4$.

**Initial conditions.** $y = (c_1 + c_2 x)e^{-2x} + 3\cos x + 4\sin x$.

$$\begin{aligned}y(0) &= c_1 + 3 = 0 &&\Rightarrow\quad c_1 = -3, \\ y'(0) &= c_2 - 2c_1 + 4 = 0 &&\Rightarrow\quad c_2 = -10 .\end{aligned}$$

**Answer.** (b) $y = -(3 + 10x)e^{-2x} + 3\cos x + 4\sin x$

**Check.** At $x = 0$: $y = -3 + 3 = 0$ and $y' = -10 + 6 + 4 = 0$.
For $y_p = 3\cos x + 4\sin x$: $y_p'' = -3\cos x - 4\sin x$,
$4y_p' = 16\cos x - 12\sin x$ and $4y_p = 12\cos x + 16\sin x$. The cosines
add to $(-3 + 16 + 12)\cos x = 25\cos x$, and the sines to
$(-4 - 12 + 16)\sin x = 0$.`,
      },
      {
        id: 'mth425-pm-q6',
        label: 'Q6',
        method: '',
        statement: String.raw`*[10 marks]* **(a)** Find the general solution of

$$x^2y'' + 3xy' + 5y = 0, \qquad x > 0 .$$

**(b)** Use variation of parameters to find the general solution of

$$x^2y'' - xy' + y = 2x, \qquad x > 0 .$$`,
        solution: String.raw`**(a) Classify.** Cauchy-Euler: each $x^k$ matches $y^{(k)}$. Try
$y = x^m$:

$$m(m - 1) + 3m + 5 = m^2 + 2m + 5 = 0 \quad\Rightarrow\quad m = -1 \pm 2i .$$

A complex pair $\alpha \pm \beta i$ gives
$x^{\alpha}\cos(\beta\ln x)$ and $x^{\alpha}\sin(\beta\ln x)$.

**Answer.** (a) $y = x^{-1}\bigl[c_1\cos(2\ln x) + c_2\sin(2\ln x)\bigr]$

**(b) Complementary solution.** Cauchy-Euler again:

$$m(m - 1) - m + 1 = m^2 - 2m + 1 = (m - 1)^2 = 0 ,$$

a repeated root, so $y_1 = x$ and $y_2 = x\ln x$.

**Standard form.** Variation of parameters needs leading coefficient 1.
Divide by $x^2$: $y'' - \tfrac1x y' + \tfrac{1}{x^2}y = \tfrac{2}{x}$, so
$f(x) = 2/x$, not $2x$. Using $2x$ here is the classic mistake, and every
later step inherits it.

**Wronskian.**

$$W = \begin{vmatrix} x & x\ln x \\ 1 & \ln x + 1 \end{vmatrix} = x\ln x + x - x\ln x = x .$$

**Parameters.**

$$\begin{aligned}u_1' &= -\frac{y_2 f}{W} = -\frac{x\ln x\cdot (2/x)}{x} = -\frac{2\ln x}{x} &&\Rightarrow\quad u_1 = -(\ln x)^2, \\ u_2' &= \frac{y_1 f}{W} = \frac{x\cdot (2/x)}{x} = \frac{2}{x} &&\Rightarrow\quad u_2 = 2\ln x .\end{aligned}$$

(The first uses $w = \ln x$, $dw = dx/x$.) Then

$$y_p = u_1 y_1 + u_2 y_2 = -x(\ln x)^2 + 2x(\ln x)^2 = x(\ln x)^2 .$$

**Answer.** (b) $y = c_1 x + c_2 x\ln x + x(\ln x)^2$

**Check.** $y_p' = (\ln x)^2 + 2\ln x$ and
$y_p'' = (2\ln x + 2)/x$, so
$x^2y_p'' - xy_p' + y_p = (2x\ln x + 2x) - (x(\ln x)^2 + 2x\ln x) + x(\ln x)^2 = 2x$.`,
      },
      {
        id: 'mth425-pm-q7',
        label: 'Q7',
        method: '',
        statement: String.raw`*[10 marks]* **(a)** Use the definition $\mathcal{L}\left\{f(t)\right\} = \displaystyle\int_0^\infty e^{-st}f(t)\,dt$
to find $\mathcal{L}\left\{f(t)\right\}$, where

$$f(t) = \begin{cases} 0, & 0 \le t < 1 \\ t, & t \ge 1 \end{cases}$$

**(b)** Write $g(t)$ in terms of unit step functions and find $\mathcal{L}\left\{g(t)\right\}$:

$$g(t) = \begin{cases} \sin t, & 0 \le t < \pi \\ 0, & t \ge \pi \end{cases}$$

**(c)** Find $\mathcal{L}\left\{t^2e^{-3t} - 4e^{2t}\cos 3t\right\}$.`,
        solution: String.raw`**(a)** $f$ is zero on $[0, 1)$, so the integral starts at 1. Integrate
by parts with $w = t$, $dv = e^{-st}dt$, taking $s > 0$:

$$\begin{aligned}\mathcal{L}\left\{f\right\} &= \int_1^\infty te^{-st}\,dt = \left[-\frac{t}{s}e^{-st}\right]_1^\infty + \frac1s\int_1^\infty e^{-st}\,dt \\ &= \left(0 + \frac{e^{-s}}{s}\right) + \frac1s\left[-\frac1s e^{-st}\right]_1^\infty = \frac{e^{-s}}{s} + \frac{e^{-s}}{s^2} .\end{aligned}$$

The upper limits vanish because $te^{-st} \to 0$ as $t \to \infty$ when
$s > 0$.

**Answer.** (a) $\mathcal{L}\left\{f\right\} = e^{-s}\left(\dfrac1s + \dfrac{1}{s^2}\right)$, $s > 0$

**Cross-check.** $f = t\,\mathcal{U}(t-1)$, and the alternative form
$\mathcal{L}\left\{g(t)\mathcal{U}(t-a)\right\} = e^{-as}\mathcal{L}\left\{g(t+a)\right\}$ gives
$e^{-s}\mathcal{L}\left\{t + 1\right\} = e^{-s}(1/s^2 + 1/s)$.

**(b)** $g$ switches $\sin t$ off at $t = \pi$:
$g(t) = \sin t - \sin t\,\mathcal{U}(t - \pi)$. Using
$\mathcal{L}\left\{g(t)\mathcal{U}(t-a)\right\} = e^{-as}\mathcal{L}\left\{g(t+a)\right\}$ with
$\sin(t + \pi) = -\sin t$:

$$\mathcal{L}\left\{\sin t\,\mathcal{U}(t-\pi)\right\} = e^{-\pi s}\mathcal{L}\left\{-\sin t\right\} = -\frac{e^{-\pi s}}{s^2+1} .$$

**Answer.** (b) $g(t) = \sin t - \sin t\,\mathcal{U}(t-\pi)$,
$\mathcal{L}\left\{g\right\} = \dfrac{1 + e^{-\pi s}}{s^2 + 1}$

**(c)** First translation, $\mathcal{L}\left\{e^{at}f(t)\right\} = F(s - a)$, applied to
$\mathcal{L}\left\{t^2\right\} = 2/s^3$ with $a = -3$ and to $\mathcal{L}\left\{\cos 3t\right\} = s/(s^2 + 9)$ with
$a = 2$:

**Answer.** (c) $\dfrac{2}{(s+3)^3} - \dfrac{4(s-2)}{(s-2)^2 + 9}$

**Note.** In (c) the shift replaces every $s$, including the one in the
numerator of the cosine transform. Writing $4s/((s-2)^2 + 9)$ is the usual
slip.`,
      },
      {
        id: 'mth425-pm-q8',
        label: 'Q8',
        method: '',
        statement: String.raw`*[10 marks]* Use the Laplace transform to solve each initial-value problem.

**(a)** $y'' + 9y = e^{t}, \qquad y(0) = 1,\quad y'(0) = 0$

**(b)** $y' + y = f(t), \qquad y(0) = 1, \qquad\text{where}\quad f(t) = \begin{cases} 0, & 0 \le t < 1 \\ 5, & t \ge 1 \end{cases}$`,
        solution: String.raw`**(a) Transform.** Using $\mathcal{L}\left\{y''\right\} = s^2Y - sy(0) - y'(0)$ and
$\mathcal{L}\left\{e^{t}\right\} = 1/(s-1)$:

$$s^2Y - s + 9Y = \frac{1}{s-1} \quad\Rightarrow\quad Y = \frac{s}{s^2 + 9} + \frac{1}{(s-1)(s^2+9)} .$$

**Partial fractions.** The quadratic is irreducible, so

$$\frac{1}{(s-1)(s^2+9)} = \frac{A}{s-1} + \frac{Bs + C}{s^2 + 9}, \qquad 1 = A(s^2 + 9) + (Bs + C)(s - 1) .$$

At $s = 1$: $1 = 10A$, so $A = \tfrac1{10}$. Matching $s^2$: $A + B = 0$, so
$B = -\tfrac1{10}$. Matching constants: $9A - C = 1$, so $C = -\tfrac1{10}$.

$$Y = \frac{s}{s^2+9} + \frac{1}{10}\cdot\frac{1}{s-1} - \frac{1}{10}\cdot\frac{s}{s^2+9} - \frac{1}{30}\cdot\frac{3}{s^2+9} .$$

**Invert.** Pairs used: $1/(s-a) \to e^{at}$,
$s/(s^2+k^2) \to \cos kt$, $k/(s^2+k^2) \to \sin kt$.

**Answer.** (a) $y = \tfrac{9}{10}\cos 3t - \tfrac{1}{30}\sin 3t + \tfrac{1}{10}e^{t}$

**Check.** $y(0) = \tfrac{9}{10} + \tfrac1{10} = 1$ and
$y'(0) = -\tfrac{1}{10} + \tfrac{1}{10} = 0$. The trig terms solve
$y'' + 9y = 0$, and $\tfrac1{10}e^{t}$ gives $\tfrac{1}{10}e^{t} + \tfrac{9}{10}e^{t} = e^{t}$.

**(b) Transform.** $f(t) = 5\,\mathcal{U}(t-1)$ and
$\mathcal{L}\left\{\mathcal{U}(t-a)\right\} = e^{-as}/s$:

$$sY - 1 + Y = \frac{5e^{-s}}{s} \quad\Rightarrow\quad Y = \frac{1}{s+1} + 5e^{-s}\cdot\frac{1}{s(s+1)} .$$

**Invert.** $\dfrac{1}{s(s+1)} = \dfrac1s - \dfrac1{s+1} \to 1 - e^{-t}$.
The second translation theorem then delays that by one unit.

**Answer.** (b) $y = e^{-t} + 5\left(1 - e^{-(t-1)}\right)\mathcal{U}(t-1)$, that is,
$y = \begin{cases} e^{-t}, & 0 \le t < 1 \\ e^{-t} + 5 - 5e^{-(t-1)}, & t \ge 1 \end{cases}$

**Check.** For $t < 1$, $y' + y = 0$. For $t \ge 1$, $y' + y = 5$. Both
pieces equal $e^{-1}$ at $t = 1$, so $y$ is continuous, as the solution of a
first-order equation with a jump in $f$ must be.`,
      },
    ],
  }
