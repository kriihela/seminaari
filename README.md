# Yksinkertainen To Do -lista Swiftillä

## Sisältö

- [Lyhyesti](#lyhyesti)
- [Swift](#swift)
- [Xcode](#xcode)
- [To do -lista](#todo)
  - [Alkuperäinen koodi](#reactnative)
  - [Kääntäminen Swiftiin](#swiftkoodi)
- [Koodin toimiminen Applen laitteilla](#laitteet)
- [Yhteenveto](#yhteenveto)
- [Lähteet](#lahteet)

## Lyhyesti <a name = "lyhyesti"></a>

<img src="https://github.com/kriihela/seminaari/blob/main/kuvat/todo-expo.png" alt="todo" width="400"/>

Tämän seminaarin aiheena on to do -lista, joka on käännetty JavaScriptistä Swiftiin. Kyseessä on vanha React Native -koulutehtävä, jonka pyrin tekemään mahdollisimman samanlaiseksi kuin alkuperäinen. Listalle voi lisätä tehtäviä ja ne voidaan poistaa. Tarkoituksenani on selvittää, miten paljon Swift eroaa JavaScriptistä ja kuinka hyvin Swiftin koodi toimii Applen eri laitteissa.

## Swift <a name = "swift"></a>

Swift on Applen kehittämä ohjelmointikieli, jota käytetään pääasiassa iOS-, iPadOS- ja macOS-käyttöjärjestelmien sovellusten kehittämiseen. Se on moderni, suorituskykyinen ja helposti luettava kieli, joka tarjoaa monia tehokkaita työkaluja sovellusten kehittämiseen. Swift perustuu ohjelmointikieli Objective-C:hen, joka on vanha, mutta edelleen suosittu kieli Applen ohjelmistokehityksessä. Sen kehitti 80-luvulla Brad Cox ja Tom Love. Swiftin tarkoituksena on korvata Objective-C Applen ohjelmistokehityksessä. Swift on avoimen lähdekoodin kieli, joten sitä kehitetään jatkuvasti Applen sekä yhteisön avustuksella ja se on saatavilla kaikille ilmaiseksi. ([Apple Developer 2022](https://developer.apple.com/swift/), [freeCodeCamp 2019](https://www.freecodecamp.org/news/learn-swift-basics-in-5-minutes-30a530e23231/)).

## Xcode <a name = "xcode"></a>

Minulla ei ole aikaisempaa kokemusta Swiftistä, mutta se on kiinnostanut minua jo jonkin aikaa. Tämä kurssi antoi hyvän mahdollisuuden viimeinkin tutustua sen perusteisiin. Ensiksi minun piti asentaa Xcode, joka on Applen kehittämä kehitysympäristö, joka pitää sisällään kaiken tarvittavan Swiftillä kehittämiseen. Se on saatavilla vain Macille. Ohjelma on melko raskas ja se vie tilaa reilu 10 gigaa. Muillakin ohjelmilla voi kirjoittaa Swiftiä, mutta Xcode on yleisesti suositeltavin, sillä se sisältää kaiken tarvittavan valmiiksi.

<img src="https://github.com/kriihela/seminaari/blob/main/kuvat/xcode.png" alt="xcode" width="800"/>

Xcode näytti alkuun melko sekavalta, koska ominaisuuksia on tarjolla paljon. Jouduinkin alkuun opiskelemaan, mitä kaikkea ohjelma tarjoaa. Päädyin lopulta luomaan uuden iOS-projektin, sillä alkuperäinen React Nativella tehty to do -lista oli luonnollisesti mobiiliohjelma. Tämän jälkeen pääsin koodaamaan, tai siis katselemaan [Youtube](https://www.youtube.com/watch?v=4if0d7Sblyo) -videoita Swiftillä koodaamisesta sekä lukemaan Swiftin [dokumentaatiota](https://www.swift.org/documentation/) ja tekemään niiden pohjalta koodia. Esimerkkejä löytyi paljon, mutta niissä oli useita erilaisia tapoja tehdä sama asia. Moni tuntui käyttävän Xcoden käyttöliittymän graafisia ominaisuuksia koodaamiseen, mutta halusin itse tehdä kaiken tekstieditorilla.

## To do -lista <a name = "todo"></a>

### Alkuperäinen React Native -app, joka käännetään Swiftiin <a name = "reactnative"></a>

```
const [input, setInput] = useState('');
const [todos, setTodos] = useState([]);

const addTodo = () => {
  setTodos([...todos, input]);
};

const deleteTodo = (index) => {
  let newTodos = [...todos];
  newTodos.splice(index, 1);
  setTodos(newTodos);
};
```

[Tämä](https://github.com/kriihela/seminaari/blob/main/App.js) yksinkertainen koodi oli pohjana to do -listaa tehdessä. Siinä on muuttujina `input`, johon käyttäjä voi syöttää tehtävän ja lista, johon tehtävät tallennetaan. Lisäksi on kaksi funktiota: `addTodo` lisää syötetyn tehtävän listaan tehtävistä. Se tekee tämän asettamalla listaan kopion nykyisestä listasta ja lisäämällä siihen syötetyn tehtävän. Toinen, `deleteTodo`-funktio, poistaa tehtävän listasta indeksin perusteella. Se tekee tämän luomalla kopion nykyisestä listasta, poistamalla halutun tehtävän siitä, ja asettamalla listan takaisin tilaksi.

```
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Insert New Task"
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <Button
          title="Add"
          onPress={addTodo}
        />
      </View>
      <View>
        {todos.map((todo, index) => (
          <View key={index} style={styles.todoContainer}>
            <Text>{todo}</Text>
            <Button
              title="Delete"
              onPress={() => deleteTodo(index)}
            />
          </View>
        ))}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
  ```

`Return`-lause palauttaa käyttäjälle näkyvän listan tehtävistä, sekä inputin, johon käyttäjä voi syöttää uuden tehtävän ja nappulat lisäämistä ja poistamista varten.

### Kääntäminen Swiftiin <a name = "swiftkoodi"></a>

`SwiftUI` ja `Combine` -kirjastot tarjoavat työkaluja ja rajapintoja, joita käytetään sovelluksen luomiseen. `Task` -structiin on määritelty tehtävän nimi ja tunniste. `TaskStore` on tehtävien tallentamiseen tarkoitettu taulukko. `ObservableObject`in avulla muutokset näkyvät automaattisesti.

```
import SwiftUI
import Combine

struct Task : Identifiable {
    var id = String()
    var newTask = String()
}

class TaskStore : ObservableObject {
    @Published var task = [Task]()
}
```

Seuraavaksi määritellään `ContentView` -struct, joka sisältää käyttöliittymän ulkoasun ja toiminnallisuuden. `VStack` -rakenne luo pystysuuntaisen tilan käyttöliittymään. Siihen sisältyy tekstikenttä, nappi ja lista, jonka `forEach`-rakenteella käydään läpi `taskStore` -taulukko. `HStack` -rakenne luo vaakasuuntaisen tilan, johon sisältyy tekstikenttä ja nappi.

```
struct ContentView: View {
    @ObservedObject var taskStore = TaskStore()
    @State var newNewTask : String=""
    
    var searchBar : some View {
        HStack{
            TextField("Insert New Task", text: self.$newNewTask)
            Button(action: self.addNewNewTask, label: {Text("Add")})
    }}
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
            }}}}
                .navigationTitle("To Do List")
                .navigationBarTitleDisplayMode(.inline)
}}}
```

Lopuksi määritellään `ContentView_Previews` -struct, joka sisältää esikatselunäkymän `ContentView` -structin sisällöstä. `Struct` on `PreviewProvider` -rakenne, joten se sisältää `static var previews` -ominaisuuden, jonka sisällä voidaan määritellä esikatselunäkymän sisältö. Tässä tapauksessa esikatselunäkymä sisältää `ContentView`n sisällön.

```
    struct ContentView_Previews: PreviewProvider {
        static var previews: some View {
            ContentView()
        }
    }
```

Koodi löytyy kokonaisuudessaan [täältä](https://github.com/kriihela/seminaari/blob/main/ContentView.swift). Kuten koodista voi huomata, se on hyvin erilaista verrattuna JavaScriptiin. Syntaksi ja käytännöt eroavat toisistaan. JavaScript on dynaaminen ohjelmointikieli, jossa muuttujien tyyppiä ei tarvitse määritellä ennalta. Swiftissä taas muuttujien tyypit on määriteltävä ennalta, jotta koodi toimisi oikein.

## Koodin toimiminen Applen laitteilla <a name = "laitteet"></a>

Koodi ajettiin sellaisenaan Applen eri laitteilla. Apple TV:ssä koodi ei toiminut, koska `SwiftUI` ei ole tuettu Apple TV-laitteissa. Myös Macilla oli ongelmia.

<img src="https://github.com/kriihela/seminaari/blob/main/kuvat/todo-iphone.png" alt="todo-iphone" width="400"/>
Koodi toimi moitteettomasti Applen uusimmalla iPhone 14 Pro -laitteella.

<img src="https://github.com/kriihela/seminaari/blob/main/kuvat/todo-ipad.png" alt="todo-ipad" width="400"/>
Koodi toimi iPad Airilla, mutta ulkoasu poikkesi odotetusta. Tämä johtui bodyn `NavigationView` -rakenteesta. Ulkoasu näytti enemmän siltä kuin pitikin, kun `NavigationView` poistettiin.

<img src="https://github.com/kriihela/seminaari/blob/main/kuvat/todo-mac.png" alt="todo-mac" width="400"/>
Koodi ei toiminut Macilla, koska MacOS ei tue `navigationBarTitleDisplayMode` -metodia. Metodin poistettaessa koodi toimi osittain, mutta tehtäviä ei voinut lisätä. Ulkoasu myös poikkesi odotetusta.

<img src="https://github.com/kriihela/seminaari/blob/main/kuvat/todo-apple-watch.png" alt="todo-apple-watch" width="400"/>
Koodi toimi moitteettomasti Applen uusimmalla Apple Watch Series 8 -laitteella.

## Yhteenveto <a name = "yhteenveto"></a>

Swift vaikuttaa olevan hyvä ohjelmointikieli Applen laitteille. Koodin opiskelu sujui hyvin, sillä tarjolla oli selkeitä ohjeita. Itse koodi poikkesi JavaScriptistä, mutta se vaikutti matalan kynnyksen kieleltä oppia. Se on myös monien lähteiden mukaan nopea ja tehokas kieli, mutta tämä ei ollut kunnolla testattavissa näin yksinkertaisessa sovelluksessa. Erilaisia kirjastoja tuntui olevan tarjolla. `SwiftUI` tuntui tarjoavan kehittäjille hyvän työkalun hienon, Applen tuotteisiin sopivan käyttöliittymän luomiseen.

Mobiililaitteilla koodi toimi moitteettomasti ilman koodin muokkaamista. Hieman yllätyksenä tuli, että koodi ei toiminut Macilla, eikä Apple TV:llä. Olin ollut siinä uskossa, että `SwiftUI` toimisi kaikilla Applen laitteilla moitteettomasti. Tästä huolimatta Swift vaikuttaa järkevältä valinnalta ohjelmointikielenä Applen laitteille. Esimerkiksi alkuperäistä React Native -sovellusta en olisi voinut ajaa suoraan muilla laitteilla kuin iPhonella. Muita laitteita varten olisi pitänyt ladata erilaisia työkaluja ja kirjastoja, sekä muokata koodia. Yritin huvikseni asentaa React Nativeen työkalut Apple Watchia varten, mutta onnistuneen asennuksen sijaan sain kasan virheviestejä, joita minulla ei ollut aikaa lähteä ratkomaan. Xcoden ja Swiftin kanssa tämän kaltaisia ongelmia ei ole, vaan kehitys voidaan aloittaa heti.

## Lähteet <a name = "lahteet"></a>

Apple Developer 2022. Swift. Luettavissa: <https://developer.apple.com/swift/>. Luettu: 7.12.2022.

Costa, Saul 2019. Learn the basics of Swift in less than ten minutes. Luettavissa: <https://www.freecodecamp.org/news/learn-swift-basics-in-5-minutes-30a530e23231/>. Luettu: 7.12.2022.

Scalable Scripts 2022. Swift Tutorial for Beginners - Create a Todo App. [Videotiedosto]. Haettu 7.12.2022 osoitteesta: <https://www.youtube.com/watch?v=4if0d7Sblyo>.

Swift 2022. Swift documentation. Luettavissa: <https://www.swift.org/documentation/>. Luettu: 7.12.2022.