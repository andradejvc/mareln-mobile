# Maré LN Mobile — React Native + Expo

Projeto mobile reorganizado a partir do repositório `andradejvc/mareln-desktop`.
As telas foram reconstruídas em React Native e as rotas são controladas pelo Expo Router.

## Estrutura

```text
app/                         # Rotas do Expo Router (cada arquivo representa uma página)
  (tabs)/                    # Navegação inferior do app
    _layout.tsx
    dashboard.tsx
    explorar.tsx
    mapa.tsx
    favoritos.tsx
    perfil.tsx
  eventos/[id].tsx            # Página dinâmica de detalhes do evento
  index.tsx                   # Landing page
  login.tsx
  registro.tsx
  recuperar-senha.tsx
  alterar-senha.tsx
src/
  pages/                      # Implementação visual de cada página
  components/                 # Componentes reutilizáveis e seções
  contexts/                   # Estado compartilhado do app
  data/                       # Eventos, categorias e imagens
  services/                   # Persistência local
  theme/                      # Cores e tema visual
  types/                      # Tipos TypeScript
  utils/                      # Funções auxiliares (reservado para expansão)
```

## Requisitos

- Node.js 22.13 ou superior (compatível com Expo SDK 57).
- npm.
- Expo Go compatível com o SDK do projeto para testar no Android; para SDKs mais novos que a versão disponível no Expo Go da loja, use uma development build.

## Executar no VS Code

1. Extraia o ZIP.
2. Abra a pasta `mareln-mobile-organizado` no VS Code.
3. No terminal, execute:

```bash
npm install
npx expo install --fix
npx expo-doctor
npx expo start -c
```

Para abrir no navegador:

```bash
npx expo start --web
```

## Onde editar as páginas

- Página inicial: `src/pages/home/HomePage.tsx` e seções em `src/components/home/`.
- Login/cadastro: `src/pages/auth/`.
- Dashboard: `src/pages/dashboard/DashboardPage.tsx`.
- Explorar: `src/pages/explore/ExplorePage.tsx`.
- Favoritos: `src/pages/favorites/FavoritesPage.tsx`.
- Mapa: `src/pages/map/MapPage.tsx`.
- Perfil: `src/pages/profile/ProfilePage.tsx`.
- Detalhes de evento: `src/pages/events/EventDetailPage.tsx`.
- Lista de eventos: `src/data/events.ts`.
- Cores: `src/theme/colors.ts`.

As rotas (arquivos dentro de `app/`) são intencionalmente pequenas: apenas apontam para a página correspondente em `src/pages/`.

## Observações

- A identidade visual usa as cores da versão Desktop: laranja `#E8590C`, rosa `#F43F5E` e creme `#FFF8F1`.
- As imagens são carregadas do diretório público do repositório Desktop no GitHub. É necessário estar conectado à internet para visualizá-las.
- Os 14 eventos são dados de demonstração adaptados da lista do Desktop. Datas, horários e locais devem ser confirmados pela fonte oficial antes de publicação.
- Login e cadastro são demonstrativos e salvam somente nome/e-mail localmente; não enviam senha e não estão conectados ao backend.
- Favoritos são salvos localmente com AsyncStorage.
- O mapa ainda não reproduz o Leaflet do Desktop; a tela lista os eventos e abre os locais no Google Maps.
