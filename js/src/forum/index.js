import { extend } from 'flarum/extend';
import SignUpModal from 'flarum/components/SignUpModal';
import m from 'mithril';

app.initializers.add('harunmenteseli/flarum-custom-signup', () => {
  // Extend the SignUpModal to add custom fields
  extend(SignUpModal.prototype, 'fields', function (fields) {
    fields.add('first_name',
      m('input.FormControl', {
        name: 'first_name',
        type: 'text',
        placeholder: app.translator.trans('harunmenteseli-custom-signup.forum.first_name'),
        required: true
      }), 10);
    fields.add('last_name',
      m('input.FormControl', {
        name: 'last_name',
        type: 'text',
        placeholder: app.translator.trans('harunmenteseli-custom-signup.forum.last_name'),
        required: true
      }), 9);
    fields.add('birth_date',
      m('input.FormControl', {
        name: 'birth_date',
        type: 'date',
        placeholder: app.translator.trans('harunmenteseli-custom-signup.forum.birth_date'),
        required: false
      }), 8);
    fields.add('country',
      m('input.FormControl', {
        name: 'country',
        type: 'text',
        placeholder: app.translator.trans('harunmenteseli-custom-signup.forum.country'),
        required: false
      }), 7);
    fields.add('city',
      m('input.FormControl', {
        name: 'city',
        type: 'text',
        placeholder: app.translator.trans('harunmenteseli-custom-signup.forum.city'),
        required: false
      }), 6);
    fields.add('social_media',
      m('input.FormControl', {
        name: 'social_media',
        type: 'text',
        placeholder: app.translator.trans('harunmenteseli-custom-signup.forum.social_media'),
        required: false
      }), 5);
    fields.add('phone',
      m('input.FormControl', {
        name: 'phone',
        type: 'text',
        placeholder: app.translator.trans('harunmenteseli-custom-signup.forum.phone'),
        required: false
      }), 4);
  });
});
