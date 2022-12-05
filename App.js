import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,

  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
