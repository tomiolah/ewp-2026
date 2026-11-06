# EWP 2026

This repository contains the music data and related resources for the EWP 2026 worship program, as well as the projection files for use with ProPresenter.
Note that all ProPresenter files should be set to a size of **1920 x 800** pixels to match the LED wall at the BBSO Campus!

## Editing songs in ProPresenter

From **ProPresenter v22** onward, presentations are no longer stored as individual `.pro` files on disk. Songs live in ProPresenter's SQLite library instead. This repo still uses exported `.pro` files in `propresenter/` so we can review, diff, and share changes in git.

Do not copy files out of ProPresenter's application data folder. Always export and import through ProPresenter.

### Pushing songs from ProPresenter into the repo

Use this after you have edited songs in ProPresenter and want those edits in git.

1. In ProPresenter, select the songs in the **Library**. Do **not** select them from a playlist.
2. Choose **File > Export > Presentation**.
3. Point the export at the `propresenter/` folder in this repository (overwrite the existing `.pro` files).
4. Commit and push the updated files as usual.

### Pulling songs from the repo into ProPresenter

Use this after `git pull` (or a fresh clone) when you want to see or use someone else's song changes.

1. Pull the latest repo changes (`git pull`).
2. In ProPresenter, choose **File > Import** (or drag the `.pro` files in) and import from the repo's `propresenter/` folder.
3. Import into the **Library**, not only into a playlist.
4. If ProPresenter asks whether to replace an existing presentation, replace it so you pick up the repo version.
5. Open the songs from the Library to review the updated slides.

Playlist copies can stay stale even after a Library import. After importing, confirm you are looking at the Library presentation (or re-add it to the playlist) before rehearsing.

## Sheet music PDF
The sheet music for EWP 2026 is not available as a PDF file in the repository, as it would be too big as file, so you can find it on this [Google Drive link](https://drive.google.com/file/d/1jK4EL1Nai0rL90ZntdKQ28nUOv9I0ob0/view?usp=sharing).

## YouTube Playlist

A YouTube playlist with all the songs from EWP 2026 can be found [here](https://youtube.com/playlist?list=PLNL-1fSwVKCg&si=DEUTUyCJ4QViyWw8).

## Song list + progress

| Song Title                                                              | Status                                |
|-------------------------------------------------------------------------|---------------------------------------|
| 24. Zsoltár                                                             | [🟡] pro done, pending review         |
| 103. Zsoltár                                                            | [🟡] pro done, pending review         |
| Ahogy Te akarod                                                         | [🟡] pro done, pending review         |
| Áldd nevét!                                                             | [🟡] pro done, pending review         |
| Csillagfényes csöndes éjjel                                             | [🟡] pro done, pending review         |
| Élő Ige drága vize                                                      | [🟡] pro done, pending review         |
| Halld, mint zengi angyal hírnök                                         | [🟡] pro done, pending review         |
| Hűséged végtelen                                                        | [🟡] pro done, pending review         |
| Immánuel                                                                | [_] plaintext done; need more context |
| Keresztednél                                                            | [🟡] pro done, pending review         |
| Kőszikla alap                                                           | [ ] To Do; need more info             |
| Légy Te az első nékem                                                   | [🟡] pro done, pending review         |
| Jöjj, és áldd az Urat!                                                  | [🟡] pro done, pending review         |
| Szent az Isten                                                          | [🟡] pro done, pending review         |
| Te vagy a mi Istenünk                                                   | [🟡] pro done, pending review         |
| Vizsgálj meg, ó, Isten                                                  | [🟡] pro done, pending review         |
