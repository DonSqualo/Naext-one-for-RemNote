import { renderWidget, usePlugin, useRunAsync, WidgetLocation, useTracker } from '@remnote/plugin-sdk';

function TagWidget() {
    const plugin = usePlugin();
    const ctx = useRunAsync(() => plugin.widget.getWidgetContext<WidgetLocation.RightSideOfEditor>(), [])
    const rem = useRunAsync(() => plugin.rem.findOne(ctx?.remId), [ctx?.remId]);
    const prio = useRunAsync(() => rem?.getPowerupProperty('customPriorityTag', 'priotity'), [rem]);
    return <div>{prio}</div>;
}

renderWidget(TagWidget);
