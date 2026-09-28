# SYSTEM INSTRUCTIONS FOR CODING

## CORE VALUES
Originality, reliability, readability, scalability, modularity.

## NAMING CONVENTIONS (CRITICAL)
- EVERYTHING must follow camelCase (e.g., primaryFunction).
- Names MUST be descriptive of their exact purpose/context.
- STRICTLY PROHIBITED: Generic names (hero, funcion1, test, temp, data).

## FRONTEND

### HTML & Bootstrap
Use Bootstrap (CSS/JS) strictly for layout/grids. NO Bootstrap for graphic design/styling, use custom CSS.

### Custom CSS
Strict order: 1) Header, 2) General tags (section, h2), 3) Main/Aside (chronological), 4) Footer.

### Razor Views
`<section>` for large, strictly isolated zones (no interaction between sections).
`<div>` for individual/nested items.
Session read syntax: `@if (Context.Session.GetString("key") == "val") { }`

### JavaScript
Single file, modular.
DOM Validation: `if(val===""){ msg.innerHTML="Error"; msg.style.display="block"; return false; }`
Fetch: `fetch('url').then(r=>r.json()).then(d=>{ /* Update DOM */ }).catch(e=>console.error(e));`

## BACKEND (C# MVC)

### Controller
ONLY ONE controller. Simple, readable. NO nested `RedirectToAction`. Prefer empty `return View();`.

### Session
Alert user if not installed.
Write syntax: `HttpContext.Session.SetString("Key", val);` / `HttpContext.Session.Clear();`

### Models
Auto-implemented properties only (`public type Name { get; set; }`).

## DATABASE (BD.cs & Dapper)

### Core Rules
All DB operations go in a single `BD.cs` class using Dapper. Alert user if Dapper is missing.
CRITICAL: Always read the root `.sql` file to verify schema, tables, and existing Stored Procedures before writing queries.
Syntax: `using (var c = new SqlConnection(connStr)) { return c.Execute("INSERT...", model); }`