import { extend } from 'flarum/extend';
import AdminPage from 'flarum/components/AdminPage';
import Button from 'flarum/components/Button';
import m from 'mithril';

app.initializers.add('harunmenteseli/flarum-custom-signup', () => {
  console.log('[harunmenteseli/flarum-custom-signup] Hello, admin!');

  // Add a new page to the admin panel for pending users
  app.routes['pending-users'] = { path: '/pending-users', component: {
    view() {
      return m('div', [
        m('h2', app.translator.trans('harunmenteseli-custom-signup.admin.pending_users')),
        m(PendingUsersList)
      ]);
    }
  } };

  app.extensionSettings['harunmenteseli/flarum-custom-signup'] = () => {
    m.route.set('/pending-users');
  };

  function PendingUsersList() {
    const users = m.stream([]);
    const loading = m.stream(true);

    function fetchUsers() {
      loading(true);
      m.request({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/users/pending',
        headers: { Authorization: 'Token ' + app.session.token() }
      }).then(result => {
        users(result.data || []);
        loading(false);
      });
    }

    function approveUser(id) {
      m.request({
        method: 'POST',
        url: app.forum.attribute('apiUrl') + '/users/approve?id=' + id,
        headers: { Authorization: 'Token ' + app.session.token() }
      }).then(fetchUsers);
    }

    fetchUsers();

    return {
      view() {
        if (loading()) return m('div', 'Loading...');
        return m('table', [
          m('thead', m('tr', [
            m('th', 'ID'),
            m('th', app.translator.trans('harunmenteseli-custom-signup.admin.first_name')),
            m('th', app.translator.trans('harunmenteseli-custom-signup.admin.last_name')),
            m('th', app.translator.trans('harunmenteseli-custom-signup.admin.approve'))
          ])),
          m('tbody', users().map(user => m('tr', [
            m('td', user.id),
            m('td', user.attributes.first_name),
            m('td', user.attributes.last_name),
            m('td', m(Button, {
              className: 'Button Button--primary',
              onclick: () => approveUser(user.id)
            }, app.translator.trans('harunmenteseli-custom-signup.admin.approve')))
          ])))
        ]);
      }
    };
  }
});
