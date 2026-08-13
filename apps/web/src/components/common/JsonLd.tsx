/**
 * Renders one or more schema.org JSON-LD objects as <script> tags.
 *
 * Server component — the payload is serialized at render time and ships as
 * static HTML, adding no client-side JavaScript.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify output is safe here — all values come from trusted
          // site constants / typed car data, never raw user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
