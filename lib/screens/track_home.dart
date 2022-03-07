import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:online_course/screens/track_info.dart';
import 'dart:convert';
import 'musicProject_info.dart';
import 'package:shared_preferences/shared_preferences.dart';

class TrackHome extends StatefulWidget {
  const TrackHome({Key? key}) : super(key: key);

  @override
  _TrackHomeState createState() => _TrackHomeState();
}

class _TrackHomeState extends State<TrackHome> {
  late Future<bool> fetchtrack;

  final List<Product1> _products1 = [];
  final String _baseUrl = "10.0.2.2:3000";
  Future<bool> Trackfet() async {


    http.Response response = await http.get(Uri.http(_baseUrl, "/api/musicproject/get-my/"));

    List<dynamic> gamesFromServer = json.decode(response.body);

    for(int i = 0; i < gamesFromServer.length; i++) {
      Map<String, dynamic> gameFromServer = gamesFromServer[i];
      _products1.add(Product1(gameFromServer["_id"], gameFromServer["nom"], gameFromServer["instrument"],gameFromServer["key"],gameFromServer["measure"],gameFromServer["tempo"],gameFromServer["MusicTr"],));
    }

    return true;
  }
  @override
  void initState() {
    fetchtrack = Trackfet();
    super.initState();

  }
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: fetchtrack,
      builder: (BuildContext context, AsyncSnapshot<bool> snapshot) {
        if(snapshot.hasData) {
          return ListView.builder(
            itemCount: _products1.length,
            itemBuilder: (BuildContext context,int index) {
              return MusicInfo(_products1[index].id, _products1[index].nom, _products1[index].instrument,_products1[index].key,);
            },
          );
        }
        else {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }
      },
    );
  }
}
