export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-emerald-50 px-4 py-5 text-center dark:bg-white/[0.03] hidden`}
    >
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        Whatsapp API
      </h3>
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
      The world's #1 alternative Whatsapp API. Get unlimited access to your WA account.
      </p>
      <a
        href="https://tailadmin.com/pricing"
        target="_blank"
        rel="nofollow"
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-emerald-400 text-theme-sm hover:bg-brand-600"
      >
        Purchase Plan
      </a>
    </div>
  );
}
