import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Archive, ArchiveRestore, ArchiveX, Inbox } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Notification } from "@/components/UserNotification";
import { useState } from "react";
import { getDaysPassed } from "@/lib/utils";

interface Props {
  value?: string;
  list: Notification[];
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;  
}

interface PropsItem extends Props {
  listNot: Notification;
}

function Item({ listNot, onArchive, onRestore }: PropsItem) {
  const [isCollapsed, setCollapsed] = useState(true);

  const handleClick = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div key={listNot.id}>
      <div className="flex justify-between items-center gap-4 cursor-pointer">
        <div className="text-sm w-full relative" onClick={handleClick}>
          <h3 className="text-md font-medium mb-1">
            {listNot.title}{" "}
            <span className="absolute right-0 font-light text-muted-foreground">
              {getDaysPassed(listNot.date) + " dias"}
            </span>
          </h3>

          <p
            className={`transition-all duration-300 ${
              isCollapsed && "text-muted-foreground line-clamp-2"
            }`}
          >
            {listNot.notification}
          </p>
        </div>
        {onArchive && (
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onArchive(listNot.id)}
            >
              <Archive className="text-muted-foreground" />
            </Button>
          </div>
        )}
        {onRestore && (
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRestore(listNot.id)}
            >
              <ArchiveRestore className="text-muted-foreground" />
            </Button>        
          </div>
        )}
      </div>
      <Separator className="my-2" />
    </div>
  );
}

export function UserNotificationTab({
  value = "notificaciones",
  list,
  onArchive,
  onRestore  
}: Props) {
  return (
    <TabsContent value={value}>
      {list.length > 0 ? (
        <ScrollArea className=" h-[250px] rounded-md">
          <Card className="border-none">
            <CardContent className="space-y-2 px-4 pt-3">
              {list
                .slice()
                .reverse()
                .map((listNot) => (
                  <Item
                    key={listNot.id}
                    list={list}
                    listNot={listNot}
                    onArchive={onArchive}
                    onRestore={onRestore}
                  />
                ))}
            </CardContent>
          </Card>
        </ScrollArea>
      ) : (
        <span className="text-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Inbox size={20} className="w-32 h-32 stroke-muted " />
          No hay {value}
        </span>
      )}
    </TabsContent>
  );
}
