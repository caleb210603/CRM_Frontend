import { Separator } from "@/components/ui/separator"
import { AppearanceForm } from "../components/appearance/AppearanceForm"

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6 py-6">
      <div>
        <h3 className="text-lg font-extrabold">Apariencia</h3>
        <p className="text-sm text-muted-foreground">
          Personaliza la apariencia de la aplicación. Cambia automáticamente entre temas de día y noche.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  )
}