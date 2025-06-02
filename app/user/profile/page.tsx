import { UserProfile } from "@clerk/nextjs";

export default function MyProfile() {
  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-8 py-2s sm:py-10">
      <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-purple-400 text-left">
        Manage Your Profile here!
      </h1>

      <div className="">
        <UserProfile
          appearance={{
            elements: {
              // Card container
              card:
                "w-full bg-black text-purple-200 border border-purple-300 shadow-xl rounded-2xl p-4 sm:p-6 md:p-8",

              // Header
              headerTitle: "text-xl sm:text-2xl font-bold text-purple-300",
              headerSubtitle: "text-sm text-purple-400",

              // Form fields
              formFieldLabel: "text-purple-200 font-medium text-sm",
              formFieldInput:
                "bg-gray-900 text-purple-100 border-purple-400 w-full text-sm sm:text-base",

              // Buttons
              button:
                "bg-purple-600 hover:bg-purple-500 text-white w-full sm:w-auto text-sm",
              buttonPrimary:
                "bg-purple-700 hover:bg-purple-600 text-white w-full sm:w-auto text-sm",

              // Tabs
              navbar:
                "bg-black border-b border-purple-400 flex flex-wrap gap-2 text-sm",
              navbarButton:
                "text-purple-200 hover:text-white px-2 py-1",
              navbarButtonActive:
                "text-white border-b-2 border-purple-500 px-2 py-1",

              // Alerts, links
              alert: "bg-purple-100 text-purple-800 text-sm",
              link: "text-purple-400 hover:text-purple-200",
            },
            variables: {
              colorPrimary: "#a855f7",
              colorBackground: "#0f0f0f",
              colorText: "#e9d5ff",
              colorInputBackground: "#1a1a1a",
              colorInputText: "#f3e8ff",
            },
          }}
        />
      </div>
    </div>
  );
}


