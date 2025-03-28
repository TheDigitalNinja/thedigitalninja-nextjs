import { StructureBuilder } from 'sanity/desk';

// Custom desk structure to organize our content types
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Photography Section
      S.listItem()
        .title('Photography')
        .child(
          S.list()
            .title('Photography')
            .items([
              S.listItem()
                .title('Albums')
                .child(S.documentTypeList('album')),
              S.listItem()
                .title('Photos')
                .child(S.documentTypeList('photo')),
            ])
        ),
      
      // Social Media Section
      S.listItem()
        .title('Social Media')
        .child(
          S.list()
            .title('Social Media')
            .items([
              S.listItem()
                .title('Microposts')
                .child(S.documentTypeList('micropost')),
            ])
        ),
      
      // Show all document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['album', 'photo', 'micropost'].includes(listItem.getId() || '')
      ),
    ]);