import { useState } from "react";
import { PersonCard, Person } from "@/components/PersonCard";
import { PersonDialog } from "@/components/PersonDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [people, setPeople] = useState<Person[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, USA",
      occupation: "Software Engineer",
      bio: "Passionate about building scalable web applications and mentoring junior developers.",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "mchen@example.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, USA",
      occupation: "Product Designer",
      bio: "Creating delightful user experiences through thoughtful design and research.",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  const filteredPeople = people.filter(
    (person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.occupation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = (personData: Omit<Person, "id"> & { id?: string }) => {
    if (personData.id) {
      // Update existing person
      setPeople(people.map((p) => (p.id === personData.id ? { ...personData, id: personData.id } : p)));
      toast({
        title: "Person updated",
        description: "The person has been successfully updated.",
      });
    } else {
      // Add new person
      const newPerson = { ...personData, id: Date.now().toString() };
      setPeople([...people, newPerson]);
      toast({
        title: "Person added",
        description: "New person has been successfully added.",
      });
    }
    setEditingPerson(null);
  };

  const handleEdit = (person: Person) => {
    setEditingPerson(person);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setPeople(people.filter((p) => p.id !== id));
    toast({
      title: "Person deleted",
      description: "The person has been successfully deleted.",
      variant: "destructive",
    });
  };

  const handleAddNew = () => {
    setEditingPerson(null);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[var(--shadow-lg)]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-10 h-10" />
            <h1 className="text-4xl font-bold">People Directory</h1>
          </div>
          <p className="text-primary-foreground/90">Manage your contacts and connections</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Add Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or occupation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={handleAddNew} size="lg" className="shadow-[var(--shadow-sm)]">
            <Plus className="w-5 h-5 mr-2" />
            Add Person
          </Button>
        </div>

        {/* People Grid */}
        {filteredPeople.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No people found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? "Try adjusting your search" : "Get started by adding your first person"}
            </p>
            {!searchQuery && (
              <Button onClick={handleAddNew}>
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Person
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPeople.map((person) => (
              <PersonCard key={person.id} person={person} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {/* Person Dialog */}
      <PersonDialog open={dialogOpen} onOpenChange={setDialogOpen} person={editingPerson} onSave={handleSave} />
    </div>
  );
};

export default Index;
