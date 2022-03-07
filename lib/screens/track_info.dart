import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class TrackInfo extends StatefulWidget {
  final String _id;
  final String _nom;
  final String _instrument;
  final String _key;
  final String _measure;
  final String _tempo;
  final String _MusicTr;


  TrackInfo(this._id, this._nom, this._instrument, this._key, this._measure,
      this._tempo, this._MusicTr);

  @override
  _TrackInfoState createState() => _TrackInfoState();
}

class _TrackInfoState extends State<TrackInfo> {
  final String _baseUrl = "10.0.2.2:3000";
  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: () async {
          SharedPreferences prefs = await SharedPreferences.getInstance();
          prefs.setString("_id", widget._id );
          prefs.setString("nom", widget._nom);
          prefs.setString("instrument", widget._instrument);
          prefs.setString("key", widget._key);
          prefs.setString("measure", widget._measure);
          prefs.setString("tempo", widget._tempo);
          prefs.setString("MusicTr", widget._MusicTr);

          //Navigator.pushNamed(context, "/Track");
        },

        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            InkWell(
                child: const Icon(Icons.restore_from_trash_rounded, size: 50,),
                onTap: () async {
                  Map<String, String> headers = {
                    "Content-Type": "application/json; charset=UTF-8"
                  };

                  http.delete(
                    Uri.http(_baseUrl, "/api/musicproject/"+widget._id), headers: headers,)
                      .then((http.Response response) {
                    if (response.statusCode == 201) {
                      //Navigator.pushReplacementNamed(context, "/");
                    }
                    else {
                      showDialog(
                          context: context,
                          builder: (BuildContext context) {
                            return const AlertDialog(
                              title: Text("Information"),
                              content: Text(
                                  "Une erreur s'est produite. Veuillez réessayer !"),
                            );
                          });
                    }
                  });
                }
            ),
            Container(

            ),
            const SizedBox(
              height: 10,
            ),
            Column(
              children: [
                Text(widget._nom),
                const SizedBox(
                  height: 10,
                ),
                Text(widget._instrument, textScaleFactor: 2),
                const SizedBox(
                  height: 10,
                ),
                Text(widget._key),
              ],
            ),

          ],
        ),
      ),

    );
  }
}
class Product1 {
  final String id;
  final String nom;
  final String instrument;
  final String key;
  final String measure;
  final String tempo;
  final String MusicTr;

  Product1(this.id, this.nom, this.instrument, this.key, this.measure,
      this.tempo, this.MusicTr);

  @override
  String toString() {
    return 'Product1{id: $id, nom: $nom, instrument: $instrument, key: $key, measure: $measure, tempo: $tempo, MusicTr: $MusicTr}';
  }
}