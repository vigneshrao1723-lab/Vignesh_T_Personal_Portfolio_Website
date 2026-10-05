import { ProjectScene } from "./ProjectScene";
import { CryptoArtifact, RagArtifact, CommerceArtifact } from "./projectArtifacts";

export type ProjectVariant = "crypto" | "rag" | "commerce";

const ARTIFACTS = {
  crypto: CryptoArtifact,
  rag: RagArtifact,
  commerce: CommerceArtifact,
};

/**
 * Single entry point for all three project artifacts, imported together
 * (not lazily from each other) so `Projects.tsx` only needs ONE
 * `React.lazy()` boundary for the whole projects-3D feature instead of one
 * per artifact — with three separate lazy boundaries all pulling from
 * files that import `three`/`@react-three/fiber`, correct chunk
 * deduplication would depend on the bundler recognizing the shared
 * dependency across four different dynamic-import call sites; one
 * boundary removes that uncertainty entirely; verified in the actual
 * build output that this produces one project-scene chunk, not several
 * (see CLAUDE.md).
 */
export default function ProjectShowcase({ variant }: { variant: ProjectVariant }) {
  const Artifact = ARTIFACTS[variant];
  return (
    <ProjectScene>
      <Artifact />
    </ProjectScene>
  );
}
