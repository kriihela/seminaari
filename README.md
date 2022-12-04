# Yksinkertainen to do -lista Swiftillä

## Sisältö

- [Lyhyesti](#lyhyesti)
- [Swift](#swift)
- [Xcode](#xcode)

## Lyhyesti <a name = "lyhyesti"></a>

Tämän seminaarin aiheena on to do -lista, joka on käännetty JavaScriptistä Swiftiin. Kyseessä on vanha React Native -koulutehtävä, jonka pyrin tekemään mahdollisimman samanlaiseksi kuin alkuperäinen. Listalle voi lisätä tehtäviä ja ne voidaan poistaa. Tarkoituksenani on selvittää, miten paljon Swift eroaa JavaScriptistä ja kuinka hyvin Swiftin koodi toimii Applen eri laitteissa.

## Swift <a name = "swift"></a>

Swift on Applen kehittämä ohjelmointikieli, jota käytetään pääasiassa iOS-, iPadOS- ja macOS-käyttöjärjestelmien sovellusten kehittämiseen. Se on moderni, suorituskykyinen ja helposti luettava kieli, joka tarjoaa monia tehokkaita työkaluja sovellusten kehittämiseen. Swift perustuu ohjelmointikieli Objective-C:hen, joka on vanha, mutta edelleen suosittu kieli Applen ohjelmistokehityksessä. Sen kehitti Brad Cox ja Tom Love. Swiftin tarkoituksena on korvata Objective-C Applen ohjelmistokehityksessä. Swift on avoimen lähdekoodin kieli, joten sitä kehitetään jatkuvasti Applen sekä yhteisön avustuksella ja se on saatavilla kaikille ilmaiseksi.

## Xcode <a name = "xcode"></a>

Minulla ei ole aikaisempaa kokemusta Swiftistä, mutta se on kiinnostanut minua jo jonkin aikaa. Tämä kurssi antoi hyvän mahdollisuuden viimeinkin tutustua sen perusteisiin. Ensiksi minun piti asentaa Xcode, joka on Applen kehittämä kehitysympäristö, joka pitää sisällään kaiken tarvittavan Swiftillä kehittämiseen. Se on saatavilla vain Macille. Ohjelma on melko raskas ja se vie tilaa reilu 10 gigaa. Muillakin ohjelmilla voi kirjoittaa Swiftiä, mutta Xcode on yleisesti suositeltavin, sillä se sisältää kaiken tarvittavan valmiiksi.

TODO kuva

Xcode näytti alkuun melko sekavalta, koska ominaisuuksia on tarjolla paljon. Jouduinkin alkuun opiskelemaan, mitä kaikkea ohjelma tarjoaa. Päädyin lopulta luomaan uuden iOS-projektin, sillä alkuperäinen React Nativella tehty to do -lista oli luonnollisesti mobiiliohjelma. Tämän jälkeen pääsin koodaamaan, tai siis katselemaan Youtube-videoita Swiftillä koodaamisesta sekä lukemaan Swiftin dokumentaatiota. Esimerkkejä löytyi paljon, mutta niissä oli useita erilaisia tapoja tehdä sama asia. Moni tuntui käyttävän Xcoden käyttöliittymän graafisia ominaisuuksia koodaamiseen, mutta halusin itse tehdä kaiken tekstieditorilla.

## To do -lista <a name = "todo"></a>

### Alkuperäinen React Native -app, joka käännetään Swiftiin

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

Tämä (lisää linkki tiedostoon) yksinkertainen koodi oli pohjana to do -listaa tehdessä. Siinä on muuttujina input, johon käyttäjä voi syöttää tehtävän ja lista, johon tehtävät tallennetaan. Lisäksi on kaksi funktiota: addTodo-funktio lisää syötetyn tehtävän listaan tehtävistä. Se tekee tämän asettamalla listaan kopion nykyisestä listasta ja lisäämällä siihen syötetyn tehtävän. Toinen, deleteTodo-funktio, poistaa tehtävän listasta indeksin perusteella. Se tekee tämän luomalla kopion nykyisestä listasta, poistamalla halutun tehtävän siitä, ja asettamalla listan takaisin tilaksi.

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

Return-lause palauttaa käyttäjälle näkyvän listan tehtävistä, sekä inputin, johon käyttäjä voi syöttää uuden tehtävän ja nappulat lisäämistä ja poistamista varten.

### Kääntäminen Swiftiin

SwiftUI ja Combine -kirjastot tarjoavat työkaluja ja rajapintoja, joita käytetään sovelluksen luomiseen.