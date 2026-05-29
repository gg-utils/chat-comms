# CANVAS_ACTION

`CANVAS_ACTION` messages target the canvas workspace. Current action types are defined in `@gg-utils/chat-comms/wire`:

- `CANVAS_ACTION_OPEN`
- `CANVAS_ACTION_UPDATE`
- `CANVAS_ACTION_CLOSE`

Use `CANVAS_ACTION_UPDATE` for title changes, replacing contents, appending contents, modifying contents, and removing contents. Do not document removed standalone actions such as separate set-title or append-content actions as current protocol types.

## Shape

```json
{
  "action_type": "CANVAS_ACTION_UPDATE",
  "action_data": {
    "target": "CANVAS",
    "canvas_id": "workspace-canvas",
    "canvas_title_label": "Project Setup Complete"
  }
}
```

## Related Specs

- `docs/communication-protocol/type-specifications/CANVAS_ACTION_OPEN.md`
- `docs/communication-protocol/type-specifications/CANVAS_ACTION_UPDATE.md`
- `docs/communication-protocol/type-specifications/CANVAS_ACTION_CLOSE.md`
