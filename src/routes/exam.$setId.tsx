import { createFileRoute, notFound } from "@tanstack/react-router";
import { ExamView } from "@/components/exam-view";
import { examById } from "@/data";

export const Route = createFileRoute("/exam/$setId")({
  loader: ({ params }) => {
    const set = examById(params.setId);
    if (!set) throw notFound();
    return { set };
  },
  component: function ExamPage() {
    const { set } = Route.useLoaderData();
    return <ExamView key={set.id} set={set} />;
  },
});
