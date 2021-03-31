# Telegram Delegator
A trivial Telegram bot that acts as a chat-proxy.

Example `config.yaml` file to be put at the top-level directory:
```
token: '<bot_token>'
masters:
  - <some_chat_id>
receivers:
  - '<group_id_starting_with_hyphen>'
  - <some_other_chat_id>
```
Leave `masters` empty to accept messages from everyone.
