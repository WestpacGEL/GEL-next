import logo from './logo.svg';
import './App.css';
import { Accordion, AccordionItem, Autocomplete, AutocompleteItem, Button, Grid, GridItem } from '@westpac/ui';
import { Key, useState } from 'react';

function App() {
  const [expandedKeys, setExpandedKeys] = useState<Iterable<string | number>>();
  const [selectedKey, setSelectedKey] = useState<string | number | null>();
  const handleSelectionChange = (key: string | number | null) => {
    setSelectedKey(key);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <Grid className="w-full">
          <GridItem span={{ initial: 12, lg: 6 }}>
            <Accordion
              look="lego"
              rounded={false}
              expandedKeys={expandedKeys}
              onExpandedChange={keys => {
                setExpandedKeys(keys);
              }}
            >
              {[
                { key: 'files', title: 'Your files' },
                { key: 'shared', title: 'Shared with you' },
                { key: 'last', title: 'Last item' },
              ].map(({ key, title }) => (
                <AccordionItem key={key} title={title}>
                  <p>{title}</p>
                  <Button>Test</Button>
                </AccordionItem>
              ))}
            </Accordion>
          </GridItem>
          <GridItem span={{ initial: 12, lg: 6 }}>
            <Autocomplete onSelectionChange={handleSelectionChange} selectedKey={selectedKey} aria-label="Animals">
              <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
              <AutocompleteItem key="cat">Cat</AutocompleteItem>
              <AutocompleteItem key="dog">Dog</AutocompleteItem>
              <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
              <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
              <AutocompleteItem key="snake">Snake</AutocompleteItem>
            </Autocomplete>
          </GridItem>
        </Grid>
      </header>
    </div>
  );
}

export default App;
