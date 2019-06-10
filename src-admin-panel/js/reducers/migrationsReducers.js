export default function reducer(
  state = {
    migrations: [],
  },
  action
) {
  switch (action.type) {
    case 'FETCH_MIGRATIONS': {
      return { ...state };
    }
    case 'FETCH_MIGRATIONS_FULFILLED': {
      return { ...state, error: action.payload };
    }
    case 'FETCH_MIGRATIONS_SUCCESS': {
      return { ...state, migrations: action.payload };
    }
  }
  return state;
}

export function fetchMigrations() {
  return {
    type: 'FETCH_MIGRATIONS',
  };
}

export function migrationsUp() {
  return {
    type: 'MIGRATIONS_UP',
  };
}

export function migrationsDown() {
  return {
    type: 'MIGRATIONS_DOWN',
  };
}

export function migrationsDownOne() {
  return {
    type: 'MIGRATIONS_DOWN_ONE',
  };
}
