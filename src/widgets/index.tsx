import { declareIndexPlugin, ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

async function onActivate(plugin: ReactRNPlugin) {
  // Register settings
  await plugin.settings.registerStringSetting({
    id: 'name',
    title: 'What is your Name?',
    defaultValue: 'Bob',
  });

  await plugin.settings.registerBooleanSetting({
    id: 'pizza',
    title: 'Do you like pizza?',
    defaultValue: true,
  });

  await plugin.settings.registerNumberSetting({
    id: 'favorite-number',
    title: 'What is your favorite number?',
    defaultValue: 42,
  });

  // A command that inserts text into the editor if focused.
  await plugin.app.registerCommand({
    id: 'editor-command',
    name: 'Editor Command',
    action: async () => {
      plugin.editor.insertPlainText('Hello World!');
    },
  });

  // Show a toast notification to the user.
  //await plugin.app.toast("I'm a toast!");

  // Register a sidebar widget.
  await plugin.app.registerWidget('sample_widget', WidgetLocation.RightSidebar, {
    dimensions: { height: 'auto', width: '100%' },
  });
  await plugin.app.registerWidget(
    'ae-tag',
    WidgetLocation.RightSideOfEditor,
    {
      dimensions: { height: "auto", width: 50 },
      powerupFilter: "customPriorityTag",
      //widgetTabIcon: 'https://i.imgur.com/MLaBDJw.png',
    },
  );

  // first power up
  await plugin.app.registerPowerup(
    'Naext', // human-readable name
    'customPriorityTag', // powerup code used to uniquely identify the powerup
    'A Custom Tag that tells you how important something is', // description
    {
      slots: [
        {
          // slot code used to uniquely identify the powerup slot
          code: 'priority',
          // human readable slot code name
          name: 'Priority',
          //hidden: true
        },
      ],
    },
  );
  
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
