# Music Provider Contract

The application keeps music provider credentials on the server and expects a
JSON API using Bearer authentication.

## Configuration

```text
MUSIC_GENERATE_URL=https://provider.example.com/v1/generate
MUSIC_STATUS_URL=https://provider.example.com/v1/status
MUSIC_API_KEY=<server-only secret>
```

Both URLs must use HTTPS.

## Submit a generation

`POST MUSIC_GENERATE_URL`

```json
{
  "title": "Midnight Drive",
  "prompt": "Dreamy synthwave with warm analog bass",
  "genre": "Synthwave",
  "mood": "Dreamy",
  "vocal": "No vocals",
  "lyrics": "",
  "durationSeconds": 180
}
```

Headers:

```text
Authorization: Bearer <MUSIC_API_KEY>
Content-Type: application/json
```

The adapter accepts either a completed media URL or an asynchronous job:

```json
{
  "id": "provider-job-id",
  "status": "generating"
}
```

It also accepts:

```json
{
  "jobId": "provider-job-id",
  "status": "completed",
  "audioUrl": "https://provider.example.com/audio/result.mp3",
  "duration": 182
}
```

Common nested `data` responses are supported. Completed audio must be served
with an `audio/*` content type and must be no larger than 25 MiB.

## Poll a generation

`GET MUSIC_STATUS_URL?jobId=<provider-job-id>`

The same Bearer header is sent. A successful response may use either shape:

```json
{
  "id": "provider-job-id",
  "status": "generating"
}
```

```json
{
  "id": "provider-job-id",
  "status": "completed",
  "audioUrl": "https://provider.example.com/audio/result.mp3",
  "duration": 182
}
```

Failures should return a non-2xx status or:

```json
{
  "id": "provider-job-id",
  "status": "failed",
  "error": "Human-readable provider error"
}
```

The application copies completed audio into private R2 storage and serves it
through an authenticated range-capable `/api/media/<jobId>` route.
