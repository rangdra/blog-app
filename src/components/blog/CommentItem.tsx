import { IComment } from "@/types";

export default function CommentItem({ comment }: { comment: IComment }) {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="text-white/80 card-body p-4 gap-1">
        <div className="flex items-center space-x-2">
          <div className="text-sm text-white ">{comment.name}</div>
          <div className="divider divider-horizontal divider-neutral" />
          <div className="text-xs text-slate-400">{comment.email}</div>
        </div>
        <p className="mt-1">{comment.body}</p>
      </div>
    </div>
  );
}
