import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Briefcase, Edit, Trash2 } from "lucide-react";

export interface Person {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  occupation: string;
  bio: string;
  avatar?: string;
}

interface PersonCardProps {
  person: Person;
  onEdit: (person: Person) => void;
  onDelete: (id: string) => void;
}

export const PersonCard = ({ person, onEdit, onDelete }: PersonCardProps) => {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-card to-secondary/20 border-border/50 hover:shadow-[var(--shadow-md)] transition-all duration-300">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground">
              {person.avatar ? (
                <img src={person.avatar} alt={person.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-8 h-8" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{person.name}</h3>
              <Badge variant="secondary" className="mt-1">
                <Briefcase className="w-3 h-3 mr-1" />
                {person.occupation}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(person)}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(person.id)}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{person.bio}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4 text-primary" />
            <span>{person.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4 text-primary" />
            <span>{person.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{person.location}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
