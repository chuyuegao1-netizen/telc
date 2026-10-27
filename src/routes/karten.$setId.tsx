import { createFileRoute, notFound } from "@tanstack/react-router";
import { CardsView } from "@/components/cards-view";
import { cardById } from "@/data";

export const Route = createFileRoute("/karten/$setId")({
  loader: ({ params }) => {
    const set = cardById(params.setId);
    if (!set) throw notFound();
    return { set };
  },
  component: function CardsPage() {
    const { set } = Route.useLoaderData();
    return <CardsView key={set.id} set={set} />;
  },
});
