import SwiftUI
import Combine

struct Task : Identifiable {
    var id = String()
    var newTask = String()
}

class TaskStore : ObservableObject {
    @Published var task = [Task]()
}

struct ContentView: View {
    @ObservedObject var taskStore = TaskStore()
    @State var newNewTask : String=""
    
    var searchBar : some View {
        HStack{
            TextField("Insert New Task", text: self.$newNewTask)
            Button(action: self.addNewNewTask, label: {Text("Add")})
        }
    }
    
    func addNewNewTask () {
        taskStore.task.append(Task(id:String(taskStore.task.count + 1 ), newTask: newNewTask))
        self.newNewTask = ""
    }
    
    var body: some View {
        NavigationView {
            VStack {
                searchBar.padding()
                List {
                    ForEach(self.taskStore.task) {
                        task in
                        HStack {
                            Text(task.newTask)
                            Spacer()
                            Button(action: {
                                self.taskStore.task.removeAll(where: {$0.id == task.id})
                            }, label: {Image(systemName: "trash")})
                        }
                    }
                }
            }
                .navigationTitle("To Do List")
                .navigationBarTitleDisplayMode(.inline)
        }
    }
}

    struct ContentView_Previews: PreviewProvider {
        static var previews: some View {
            ContentView()
        }
    }
