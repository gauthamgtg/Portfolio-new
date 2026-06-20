import Site from "@/components/Site";

/**
 * The single-page atelier experience. Rendered as one immersive scroll;
 * <Site/> is a client shell so the loader, WebGL hero, smooth-scroll and
 * scroll choreography can run, while this route stays a thin server entry.
 */
export default function Page() {
  return <Site />;
}
