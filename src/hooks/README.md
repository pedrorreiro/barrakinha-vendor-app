# Hook useTheme

Este hook personalizado gerencia o tema da aplicação com persistência no MMKV.

## Funcionalidades

- ✅ Persistência do tema no MMKV
- ✅ Carregamento automático do tema salvo
- ✅ Toggle entre temas claro/escuro
- ✅ Definição direta do tema

## Como usar

```tsx
import { useTheme } from "../hooks/useTheme";

function MeuComponente() {
  const { colorScheme, toggleTheme, setTheme } = useTheme();

  return (
    <View>
      <Text>Tema atual: {colorScheme}</Text>

      {/* Toggle do tema */}
      <Button onPress={toggleTheme} title="Alternar Tema" />

      {/* Definir tema específico */}
      <Button onPress={() => setTheme("light")} title="Tema Claro" />
      <Button onPress={() => setTheme("dark")} title="Tema Escuro" />
    </View>
  );
}
```

## API

### `colorScheme`

- Tipo: `'light' | 'dark'`
- Descrição: O tema atual da aplicação

### `toggleTheme()`

- Tipo: `() => void`
- Descrição: Alterna entre tema claro e escuro

### `setTheme(theme)`

- Tipo: `(theme: 'light' | 'dark') => void`
- Descrição: Define um tema específico

## Armazenamento

O tema é automaticamente salvo no MMKV usando a chave `'theme'` e carregado quando a aplicação inicia.
